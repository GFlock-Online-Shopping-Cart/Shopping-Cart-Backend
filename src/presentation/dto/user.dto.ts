import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    mobileNumber: string

    @IsString()
    @IsNotEmpty()
    streetAddress: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    province: string
}