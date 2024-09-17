import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", nullable: false})
    username: string;

    @Column()
    phone: number;

    @Column()
    password: string;

    @OneToMany(() => Message, message => message.user)
    messages: Message[];
}