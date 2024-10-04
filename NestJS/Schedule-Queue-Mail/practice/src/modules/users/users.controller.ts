import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllUsersDTO, RegisterDTO, UpdateUserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() registerDto: RegisterDTO): Promise<any> {
    return await this.usersService.register(registerDto);
  }

  @UseInterceptors(ClassSerializerInterceptor) // not return password in response
  @Get()
  async getAllUsers(@Query() payload: GetAllUsersDTO): Promise<any> {
    const users = await this.usersService.getAllUsers(payload);
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.usersService.getUserDetails(id);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<any> {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.usersService.deleteUser(id);
  }
}
