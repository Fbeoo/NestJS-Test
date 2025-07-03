import { Controller, Delete, Get, Param, Post, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';

// @UseGuards(AuthGuard('jwt')) // Áp dụng cho toàn bộ controller
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
