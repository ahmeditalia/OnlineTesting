import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column()
    correctness: boolean;
}
