import {
    Entity,
    ManyToMany,
    JoinTable,
    ManyToOne
} from "typeorm";
import {Answer} from "./Answer";
import {Question} from "./Question";
import {UserExams} from "./UserExams";

@Entity()
export class QuestionDetail {

    @ManyToOne(type => UserExams, ux => ux.questions, {
        primary: true
    })
    userExam: UserExams;

    @ManyToOne(type => Question, {
        primary: true
    })
    question: Question;

    @ManyToOne(type => Answer)
    chosenAnswer: Answer;

    @ManyToMany(type => Answer, answer=> answer.questionDetails)
    @JoinTable()
    answers: Answer[];

}
