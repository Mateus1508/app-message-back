export class MessageDTO {
    id: number;
    content: string;
    sentTimestamp: Date;
    senderId: number;
    receiverId: number;

    constructor(
        id: number,
        content: string,
        sentTimestamp: Date,
        senderId: number,
        receiverId: number
    ) {
        this.id = id;
        this.content = content;
        this.sentTimestamp = sentTimestamp;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
