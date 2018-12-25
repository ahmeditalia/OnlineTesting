import {Entity, OneToMany} from "typeorm";
import {User} from "./User";
import {Position} from "./Position";

@Entity()
export class HR extends User{

    @OneToMany(type => Position, position=> position.hr)
    positions: Position[];
}

