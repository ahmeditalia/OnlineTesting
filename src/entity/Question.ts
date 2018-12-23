import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
}
