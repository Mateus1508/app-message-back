import { User } from "../entities/User";

export interface IUserRepository {
    getById(id: number): Promise<User | null>;
    create(user: User): Promise<boolean>;
    update(user: User): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}