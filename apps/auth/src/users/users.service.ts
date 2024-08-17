import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UsersRepository) {

    }

    async create(createUserDto: CreateUserDto) {
        this.validateCreateUserDto(createUserDto);
        
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({email: createUserDto.email})

        } catch(err) {
            return;
        }

        throw new UnprocessableEntityException('Email already exists.')
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.userRepository.findOne(getUserDto)
    }

}
