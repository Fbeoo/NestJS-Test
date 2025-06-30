import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto { // DTO là Data Transfer Object, dùng để truyền dữ liệu giữa controller và service
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
}