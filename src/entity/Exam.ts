import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @OneToMany(type => Question, question => question.exam)
    questions: Question[];
}
