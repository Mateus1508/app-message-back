import { Message } from "../entities/Message";

export interface IMessageRepository {
    save(message: Message): Promise<boolean>;
    getByUserId(userId: number): Promise<Message[]>;
    getBetweenUsers(senderId: number, receiverId: number): Promise<Message[]>;
}