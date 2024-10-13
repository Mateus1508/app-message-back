import mapper from "mapper-tsk";
import { UserDTO } from "../../../application/dto/UserDTO";
import { BaseResponse } from "../../../application/responses/BaseResponse";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { User } from "../../entities/User";

interface CreateUserRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export class CreateUser{
    constructor(private _userRepository: UserRepository) {}

    public async execute(request: CreateUserRequest): Promise<BaseResponse<UserDTO>> {

        const userDto = mapper.mapObject<CreateUserRequest, User>(request, new User());
        const result = await this._userRepository.create(userDto);

        return new BaseResponse(
            result ? "User created successfully" : "Error creating user",
            200,
            result
        )
    }
}