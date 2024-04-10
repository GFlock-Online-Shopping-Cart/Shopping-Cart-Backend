import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CartItemtDTO {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    productId: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number
}
