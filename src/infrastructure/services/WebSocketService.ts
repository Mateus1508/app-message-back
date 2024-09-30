import { Server, Socket } from "socket.io";

export class WebSocketService {
    private io: Server;

    constructor(io: Server, private userService: any) {
      this.io = io;
      this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
    }
  
    private handleConnection(socket: Socket): void {
      console.log(`User connected: ${socket.id}`);
  
      socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        this.handleSendMessage(senderId, receiverId, text);
      });
  
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    }
  
    private handleSendMessage(senderId: string, receiverId: string, text: string): void {
      const receiverSocketId = this.userService.getSocketId(receiverId);
  
      if (receiverSocketId) {
        this.io.to(receiverSocketId).emit('getMessage', { senderId, text });
        console.log(`Message send from ${senderId} to ${receiverId}: ${text}`);
      } else {
        console.log(`User ${receiverId} don't connected.`);
      }
    }
}