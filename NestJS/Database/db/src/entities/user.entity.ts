import { Photo } from "./photo.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    isActive: boolean;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];
}
