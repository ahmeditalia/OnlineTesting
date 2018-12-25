import {Entity, Column, PrimaryColumn, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import {Exam} from "./Exam";
import {Candidate} from "./Candidate";
import {QuestionDetail} from "./QuestionDetail";

@Entity()
export class UserExams {

    @ManyToOne(type => Exam, {
        primary: true
    })
    exam: Exam;

    @ManyToOne(type => Candidate, candidate => candidate.userExams, {
        primary: true
    })
    candidate: Candidate;

    @OneToOne(type => UserExams)
    @JoinColumn()
    precedence: UserExams;

    @Column({ default: false})
    passed: boolean;

    @Column({ default: 0, type: 'float' })
    score: number;

    @OneToMany(type => QuestionDetail, questionDetail => questionDetail.userExam)
    questions: QuestionDetail[];
}