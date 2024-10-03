import { Socket } from "socket.io";

export interface IWebSocketService {
    handleConnection(socket: Socket): void;
    handleSendMessage(senderId: string, receiverId: string, text: string): void;
  }