import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany} from "typeorm";
import {Answer} from "./Answer";
import {QuestionAnswers} from "./QuestionAnswers";

@Entity()
export class QuestionDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Answer)
    @JoinColumn()
    chosenAnswer: Answer;

    @OneToOne(type => QuestionAnswers)
    Answers: QuestionAnswers;

}
