import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
}