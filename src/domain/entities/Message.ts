import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    sentTimestamp: Date;

    @ManyToOne(() => User, user => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver: User;
}