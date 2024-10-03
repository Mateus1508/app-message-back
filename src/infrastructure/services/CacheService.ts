import { ICacheService } from "../../application/services/ICacheService";
import { RedisClient } from "../config/redis";

export class CacheService implements ICacheService {

    public async set(key: string, value: string): Promise<void> {
        await RedisClient.set(key, value);
    }

    public async get(key: string): Promise<string | null> {
        return await RedisClient.get(key);
    }

    public async del(key: string): Promise<void> {
        await RedisClient.del(key);
    }
    
}