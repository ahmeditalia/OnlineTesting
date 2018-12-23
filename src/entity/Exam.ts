import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;
}
