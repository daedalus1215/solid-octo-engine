import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getHello(): string {
        return "hello world"
    }


    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
}
