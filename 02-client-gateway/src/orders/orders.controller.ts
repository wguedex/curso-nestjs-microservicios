import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common'; 
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

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
  findOne(@Param('id') id: string) { 

    return this.orderClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),    
    );

  }

}
