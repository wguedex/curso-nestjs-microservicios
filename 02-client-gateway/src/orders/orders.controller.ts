import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe } from '@nestjs/common';  
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) { 
    return this.orderClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll() {  
    return this.orderClient.send(
      'findAllOrders',
      PaginationDto,
    );    

  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.orderClient.send('findOneOrder', { id })
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe) id: string) { 

  //   return this.orderClient.send('findOneOrder', { id }).pipe(
  //     catchError((err) => {
  //       throw new RpcException(err);
  //     }),    
  //   );

  // }

}
