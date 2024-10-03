import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const RedisClient = new Redis({
    host: REDIS_HOST || 'localhost',
    port: Number(REDIS_PORT) || 6379,
    password: REDIS_PASSWORD || undefined,
});
