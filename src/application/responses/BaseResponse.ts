export class BaseResponse<T> {
    data?: T;
    text: string;
    status: number;
    success: boolean;

    constructor(text: string, status: number, success: boolean, data?: T) {
        this.text = text;
        this.status = status;
        this.success = success;
        this.data = data;
    }
}