import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class UserExams {

    @PrimaryColumn()
    userID: number;

    @PrimaryColumn()
    ExamID: number;

    @Column()
    precedence: number;

    @Column()
    passed: boolean;

    @Column('float')
    score: number;
}
