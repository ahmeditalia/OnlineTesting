import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import {QuestionDetail} from "./QuestionDetail";
import {Question} from "./Question";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column()
    correctness: boolean;

    @ManyToMany(type => QuestionDetail, questionDetail => questionDetail.answers)
    questionDetails: QuestionDetail[];

    @ManyToOne(type => Question, question => question.answers)
    question: Question;
}
