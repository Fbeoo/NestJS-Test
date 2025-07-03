import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        // Passport sẽ tự động lấy username, password từ body và đưa vào đây
        const user = await this.authService.validateUser(email, password);
        if (!user) {
          throw new UnauthorizedException(); // Nếu không hợp lệ, ném lỗi
        }
        return user; // Nếu hợp lệ, trả về user -> user này sẽ được gán vào req.user
    }
}   