import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from './auth.registerdto';
import { User } from './auth.userdto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) { }

    @Post('/register')
    async register(@Body() authRegisterUserDto: register) {
        return await this.authservice.registerUser(authRegisterUserDto);
    }

    @Post('/login')
    async login(@Body() authLoginUserDto: User) {
        return await this.authservice.authenticateUser(authLoginUserDto);
    }
}
