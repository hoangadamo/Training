import { IsInt, IsNotEmpty, MinLength } from "@nestjs/class-validator";
import { Optional } from "@nestjs/common";

export class CreateCatDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Optional()
    age: string;

    @MinLength(5)
    breed: string;
}
