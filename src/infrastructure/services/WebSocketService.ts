import { Server, Socket } from "socket.io";
import { IWebSocketService } from "../../application/services/IWebSocketService";
import { CacheService } from "./CacheService";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisClient } from "../config/redis";

export class WebSocketService implements IWebSocketService {
    private io: Server;
    private cacheService: CacheService;

    constructor(io: Server, cacheService: CacheService) {
      this.io = io;
      this.cacheService = cacheService;

      const pubClient = RedisClient;
        const subClient = pubClient.duplicate();

      this.io.adapter(createAdapter(pubClient, subClient));

      this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
    }
  
    public async handleConnection(socket: Socket): Promise<void> {
      console.log(`User connected: ${socket.id}`);
  
      socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        this.handleSendMessage(senderId, receiverId, text);
      });
  
      socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
        await this.cacheService.del(`socket:${socket.id}`);
      });
    }
  
    public async handleSendMessage(senderId: string, receiverId: string, text: string): Promise<void> {
      const receiverSocketId = await this.cacheService.get(`user:${receiverId}`);
  
      if (receiverSocketId) {
        this.io.to(receiverSocketId).emit('getMessage', { senderId, text });
        console.log(`Message send from ${senderId} to ${receiverId}: ${text}`);
      } else {
        console.log(`User ${receiverId} isn't connected.`);
      }
    }

    public async storeUserSocket(userId: string, socketId: string): Promise<void> {
      try {
          await this.cacheService.set(`user:${userId}`, socketId);
      } catch (error) {
          console.error(`Failed to store socket for user ${userId}:`, error);
      }
   }
}