import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto { // DTO là Data Transfer Object, dùng để truyền dữ liệu giữa controller và service
    @ApiProperty({ description: 'Email đăng nhập' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'Mật khẩu' })
    @IsNotEmpty()
    @IsString()
    password: string;
    
}