import { IsNotEmpty, IsString } from "class-validator";

export class CreateCheckoutDTO {
    @IsString()
    idToken: string
}
