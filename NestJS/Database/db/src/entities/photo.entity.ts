import { User } from "./user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.photos)
    user: User
}
