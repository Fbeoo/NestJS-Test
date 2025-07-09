import { Body, Controller, Get, Post, Req, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create_post.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { TrimPipe } from 'src/common/pipes/trim.pipe';

@UseGuards(AuthGuard('jwt'), RoleGuard) // Áp dụng guard cho toàn bộ controller
@Controller('post')
@UsePipes(TrimPipe) // Áp dụng transform pipe cho toàn bộ controller (custom pipe)
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    @UseFilters(HttpExceptionFilter) // Gán custom exception filter cho 1 route cụ thể
    // @UsePipes(TrimPipe) // Gán custom validation pipe cho 1 route cụ thể
    findAll() {
        return this.postService.findAll();
    }

    @Roles(Role.ADMIN)
    @Post()
    createPost(@Body() createPostDto: CreatePostDto, @Req() req: any) {
        return this.postService.createPost(createPostDto, req.user);
    }
}
