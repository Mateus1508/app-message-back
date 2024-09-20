import { DataSource } from "typeorm";
import { User } from "../../domain/entities/User";
import { Message } from "../../domain/entities/Message";
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

export const Database = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User, Message],
    migrations: ['src/infrastructure/migrations/*.ts'],
    synchronize: false,
    logging: true,
})