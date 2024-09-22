import { Repository } from "typeorm";
import { Message } from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/interfaces/IMessageRepository";
import { Database } from "../config/database";
import { User } from "../../domain/entities/User";

export class MessageRepository implements IMessageRepository {
    private ormRepository: Repository<Message>;

    constructor() {
        this.ormRepository = Database.getRepository(Message);
    }
    
    async save(message: Message): Promise<boolean> {
        try {
            await this.ormRepository.save(message);
            return true;
        } catch (error) {
            console.error('Error to save message:', error);
            return false;
        }
    }
    async getByUserId(userId: number): Promise<Message[]> {

        try {
            return this.ormRepository.find({
                where: [
                  { sender: {id: userId} },
                  { receiver: {id: userId} }
                ],
                order: {
                  sentTimestamp: 'DESC'
                }
              });
        }
        catch (error) {
            console.error('Error to get messages by user:', error);
            throw new Error('Error to get messages by user');
        }
    }

    async getBetweenUsers(senderId: number, receiverId: number): Promise<Message[]> {
        try {
            const messages = await this.ormRepository.find({
                where: [
                    { sender: { id: senderId }, receiver: { id: receiverId } },
                    { sender: { id: receiverId }, receiver: { id: senderId } }
                ],
                order: {
                    sentTimestamp: 'DESC'
                }
            });
            return messages;
        }
        catch (error) {
            console.error('Error to get messages between users:', error);
            throw new Error('Error to get messages between users');
        }

    }
    
}