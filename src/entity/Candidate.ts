import {Entity, Column} from "typeorm";
import {User} from "./User";

@Entity()
export class Candidate extends User {

    @Column('text')
    cv: string;
}
