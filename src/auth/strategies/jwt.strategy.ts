import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../common/constants'; // Tạo file này để lưu secret key

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header "Authorization: Bearer <token>"
          ignoreExpiration: false, // Không bỏ qua nếu token hết hạn
          secretOrKey: jwtConstants.secret as string, // Dùng secret key để xác thực token
        });
    }

    async validate(payload: any) {
        // Passport đã xác thực token thành công, payload là nội dung đã giải mã
        // Ta chỉ cần trả về payload, nó sẽ được gán vào req.user
        return { userId: payload.sub, role: payload.role };
    }
}