import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { BaseDTO } from "src/DTO/BaseDTO";

export class UpdateUserDTO {
    @IsOptional()
    @MinLength(5)
    username?: string;

    @IsOptional()
    firstname?: string;

    @IsOptional()
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(8)
    password?: string;
}

export class GetAllUsersDTO extends BaseDTO {
    search?: string;
    isAdmin?: boolean;
    isActive?: boolean;
}

export class RegisterDTO {
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}