import {Entity, Column, PrimaryColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";
import {UserExams} from "./UserExams";
import {PositionApplication} from "./PositionApplication";

@Entity()
export class Candidate extends User {

    @Column('text')
    cv: string;

    @OneToMany(type => UserExams, userExam => userExam.candidate)
    userExams: UserExams[];

    @OneToMany(type => PositionApplication, positionApplicatio => positionApplicatio.candidate)
    positions: PositionApplication[];

}