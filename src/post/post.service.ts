import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create_post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async createPost(createPostDto: CreatePostDto) {
        const post = this.postRepository.create(createPostDto);
        return await this.postRepository.save(post);
    }
}
