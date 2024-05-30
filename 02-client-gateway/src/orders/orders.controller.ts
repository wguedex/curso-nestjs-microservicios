import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';  
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDTO } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) { 
    return this.orderClient.send('createOrder', createOrderDto);
  }

  // @Get()
  // findAll( @Query() orderPaginationDTO: OrderPaginationDTO ) {  
 
  //   return this.orderClient.send(
  //     'findAllOrders',
  //     orderPaginationDTO,
  //   );    

  // }

  @Get()
  async findAll( @Query() orderPaginationDto: OrderPaginationDTO ) {
    try {
      const orders = await firstValueFrom(
        this.orderClient.send('findAllOrders', orderPaginationDto)
      )
      return orders;

    } catch (error) {
      throw new RpcException(error);
    }
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
