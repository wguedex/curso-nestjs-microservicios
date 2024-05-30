import { Injectable, OnModuleInit, Logger, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { OrderPaginationDTO } from './dto/order-pagination.dto';

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
 
  async findAll(orderPaginationDto: OrderPaginationDTO) {
    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status,
      },
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        // skip: (currentPage - 1) * perPage,
        // take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
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
