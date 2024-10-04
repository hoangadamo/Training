import { Injectable, Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRespository: Repository<User>, // đưa UsersRepository vào UsersService bằng cách sử dụng decorator @InjectRepository
    private dataSource: DataSource, // Inject DataSource để quản lý các transaction
  ){}

  // transaction
  async createMany(users: User[]){ 
    // Bắt đầu một transaction
    await this.dataSource.transaction(async manager =>{
      // Lưu từng user vào cơ sở dữ liệu
      await manager.save(users[0]);
      await manager.save(users[1]);
      // Nếu có lỗi xảy ra trong quá trình lưu, toàn bộ giao dịch sẽ bị rollback
    })
  }

  findAll(): Promise<User[]> {
    return this.usersRespository.find();
  }
}