import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import {UserExams} from "./UserExams";

@Entity()
export class Candidate extends User {

    @Column('text')
    cv: string;

    @OneToMany(type => UserExams, userExam => userExam.candidate)
    userExams: UserExams[];
}