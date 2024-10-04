import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @ManyToOne((type) => User, (user) => user.invoices)
  @JoinColumn({ name: 'userId' }) // set name to be userId
  user: User;
}