import { IsEnum, IsOptional } from "class-validator";
import { orderStatusList } from "../enum/order.enum";
import { OrderStatus } from "@prisma/client";

export class OrderPaginationDTO {
    @IsOptional()
    @IsEnum(orderStatusList,{
        message: `Validate status are ${orderStatusList}`
    })
    status: OrderStatus
}