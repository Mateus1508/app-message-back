export class UserDTO {
    id: number;
    username: string;
    email: string;
    contacts: number[];
    sentMessages: number[];
    receivedMessages: number[];

    /* constructor(
        id: number,
        username: string,
        email: string,
        contacts: number[],
        sentMessages: number[],
        receivedMessages: number[]
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.contacts = contacts;
        this.sentMessages = sentMessages;
        this.receivedMessages = receivedMessages;
    } */
}