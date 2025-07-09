import { Post } from '../../post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity() // Đánh dấu class User là một entity
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    role: number;

    @OneToMany(type => Post, post => post.user_id)
    posts: Post[];
}