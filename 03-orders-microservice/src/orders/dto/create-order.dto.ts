import { OrderStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { orderStatusList } from '../enum/order.enum';

export class CreateOrderDto {

  @IsNumber()  
  @IsPositive()
  totalAmount: number;

  @IsNumber()  
  @IsPositive()  
  totalItems: number;

  @IsEnum( orderStatusList, {
    message: `Possible status values are ${orderStatusList}`
  } )  
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;

}