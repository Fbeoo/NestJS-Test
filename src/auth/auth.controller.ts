import { Body, Controller, Get, Param, Post, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// import { AuthGuard } from './auth.guard'; // Su dung cho jwt tuy chinh (khong su dung passport)
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/public';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // @Public() // Su dung cho jwt tuy chinh (khong su dung passport)
    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    @Post('/login')
// @UseGuards(AuthGuard)  // Ap dung cho 1 route cu the
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
