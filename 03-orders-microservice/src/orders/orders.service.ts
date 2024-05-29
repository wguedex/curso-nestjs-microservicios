import { Injectable, OnModuleInit, Logger, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService  extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');
 
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
 
  async create(createOrderDto: CreateOrderDto) {
     
    const order = await this.order.create({
      data: { 
        ...createOrderDto
      },
    });

    return order;
 
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {

    const order = await this.order.findFirst({
      where: { id }
    });

    if ( !order ) {
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Order with id ${ id } not found`
      });
    }

    return order;

  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
