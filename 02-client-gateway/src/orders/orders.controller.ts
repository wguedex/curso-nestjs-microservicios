import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
// import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDTO, StatusDTO } from './dto';
import { NATS_SERVICE } from 'src/config/services';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDTO) {
    try {
      const orders = await firstValueFrom(
        this.orderClient.send('findAllOrders', orderPaginationDto),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.orderClient.send('findOneOrder', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(@Param() status: StatusDTO) {
    try {
      return this.orderClient.send('findAllOrders', {
        ...PaginationDto,
        status: status.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: String,
    @Body() statusDTO: StatusDTO,
  ) {
    try {
      return this.orderClient.send('changeOrderStatus', {
        id,
        status: statusDTO.status,
      });
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
