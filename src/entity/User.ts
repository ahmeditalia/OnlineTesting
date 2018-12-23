import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    username: string;

    @Column({length: 32})
    password: string;

    @Column()
    email: string;

    @Column()
    contactNumber: string;
}
