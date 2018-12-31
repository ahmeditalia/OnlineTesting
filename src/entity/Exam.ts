import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Exam {

    @PrimaryColumn({length: 50})
    name: string;

    @OneToMany(type => Question, question => question.exam)
    questions: Question[];
}
