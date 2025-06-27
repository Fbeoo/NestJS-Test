import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}