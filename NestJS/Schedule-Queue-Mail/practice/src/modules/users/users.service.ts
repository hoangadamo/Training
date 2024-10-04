import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetAllUsersDTO, RegisterDTO, UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const { username, email, firstname, lastname, password } = registerDto;

    if (!firstname || !lastname || !username || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    // check if username/email already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser) {
      throw new BadRequestException('email or username already exists');
    }

    const hashed = await bcrypt.hash(registerDto.password, 10);

    const newUser = this.usersRepository.create({
      ...registerDto,
      password: hashed,
      isAdmin: false,
      isActive: true,
    });
    await this.usersRepository.save(newUser);
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.sendUserConfirmation(newUser);
    return newUser;
  }

  async getAllUsers(payload: GetAllUsersDTO): Promise<User[]> {
    const { page, limit, search, isAdmin, isActive } = payload;
    const query = this.usersRepository.createQueryBuilder('user');
    // search by firstname, lastname, fullname = firstname + ' ' + lastname
    if (search) {
      query.andWhere(
        "user.firstname ILIKE :search OR user.lastname ILIKE :search OR CONCAT(user.firstname, ' ', user.lastname) ILIKE :search",
        { search: `%${search}%` },
      );
    }
    // filter by isAdmin
    if (isAdmin !== undefined) {
      query.andWhere('user.isAdmin = :isAdmin', { isAdmin });
    }
    // filter by isActive
    if (isActive !== undefined) {
      query.andWhere('user.isActive= :isActive', { isActive });
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      query.limit(limit).offset(offset);
    }
    return await query.getMany();
  }

  async getUserDetails(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.getUserDetails(id);
    const { username, firstname, lastname, email, password } = updateUserDto;

    if (username) {
      user.username = username;
    }

    if (firstname) {
      user.firstname = firstname;
    }

    if (lastname) {
      user.firstname = lastname;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      const hashed = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashed;
    }
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.usersRepository.delete(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return 'delete successfully';
  }
}
