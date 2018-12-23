import {Entity, Column} from "typeorm";
import {User} from "./User";

@Entity("student" && "teacher")
export class Candidate extends User {

    @Column('text')
    cv: string;
}
