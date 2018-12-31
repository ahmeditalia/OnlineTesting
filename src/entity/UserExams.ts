import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Exam} from "./Exam";
import {Candidate} from "./Candidate";
import {QuestionDetail} from "./QuestionDetail";
import {Position} from "./Position";

@Entity()
export class UserExams {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Exam)
    exam: Exam;

    @ManyToOne(type => Candidate, candidate => candidate.userExams)
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

    @ManyToOne(type => Position)
    position: Position;
}