import { Repository } from "typeorm";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class UserRepository implements IUserRepository { 
    private ormRepository: Repository<User>;

    constructor(ormRepository: Repository<User>) {
        this.ormRepository = ormRepository;
    }

    async getById(id: number): Promise<User | null> {
        try {
            return await this.ormRepository.findOne({ where: { id } });
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw("Error fetching user by ID");
        }
    }

    async create(user: User): Promise<boolean> {
        try {
            await this.ormRepository.save(user);
            return true;
        } catch (error) {
            console.error('Error creating user:', error);
            throw("Error creating user");
        }
    }

    async update(user: User): Promise<boolean> {
        try {
            await this.ormRepository.save(user);
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            throw("Error updating user");
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.ormRepository.delete(id);
            return result.affected !== 0;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw("Error deleting user");
        }
    }
}