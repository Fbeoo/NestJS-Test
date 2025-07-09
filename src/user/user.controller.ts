import { Controller, Delete, Get, Param, Post, Body, ParseIntPipe, UseGuards, NotFoundException, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { IsPhoneNumberPipe } from 'src/common/pipes/phone-number.pipe';

// @UseGuards(AuthGuard('jwt')) // Áp dụng cho toàn bộ controller
@UseGuards(AuthGuard('jwt'), RoleGuard)
// @UsePipes(IsPhoneNumberPipe)
@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: string): Promise<User | null> {
        const user = await this.userService.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');  
        }

        return user;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
