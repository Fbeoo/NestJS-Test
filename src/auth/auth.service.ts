import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(email)

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.email, username: user.password };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(user: any) {
        const payload = { sub: user.id, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
