import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Invoice } from './invoice.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // hide password from response
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  isAdmin: boolean;

  @OneToMany((type) => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
}
