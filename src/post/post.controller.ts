import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create_post.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

@UseGuards(AuthGuard('jwt'), RoleGuard) // Áp dụng guard cho toàn bộ controller
@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Roles(Role.ADMIN)
    @Post()
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }
}
