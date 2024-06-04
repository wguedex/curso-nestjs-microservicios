import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, ValidateNested, arrayMinSize, isArray } from "class-validator";



export class PaymentSessionDTO {

    @IsString()
    currency: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true}) //Validaciones para elementos internos
    @Type(() => PaymentSessionItemDTO)
    items: PaymentSessionItemDTO[];

}

export class PaymentSessionItemDTO {
    
    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()   
    quantity: number;
}