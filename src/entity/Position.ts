import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {HR} from "./HR";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column('text')
    description: string;

    @ManyToOne(type => HR, hr=> hr.positions)
    hr: HR;
}