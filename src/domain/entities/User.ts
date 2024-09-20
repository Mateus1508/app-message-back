import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    username: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    phone: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @ManyToMany(() => User, { cascade: true })
    @JoinTable({
        name: 'user_contacts',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'contact_id', referencedColumnName: 'id' }
    })
    contacts: User[];

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];
}
