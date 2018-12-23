import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany} from "typeorm";
import {Answer} from "./Answer";

@Entity()
export class QuestionAnswers {

    @OneToMany(type => Answer)
    @JoinColumn()
    answers: Answer[];

}
