import {
    Entity,
    ManyToOne, Column
} from "typeorm";
import {Position} from "./Position";
import {Candidate} from "./Candidate";

@Entity()
export class PositionApplication {

    @ManyToOne(type => Position, {
        primary: true
    })
    position: Position;

    @ManyToOne(type => Candidate, candidate => candidate.positions, {
        primary: true
    })
    candidate: Candidate;

    @Column({default: false})
    accepted: boolean;

    @Column({default: false})
    seen: boolean;
}
