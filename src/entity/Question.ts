import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Exam} from "./Exam";
import {Answer} from "./Answer";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @ManyToOne(type => Exam, exam=> exam.questions)
    exam: Exam;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];
}
