import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"; 
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private readonly model: Repository<User>) {
        super(model.target, model.manager, model.queryRunner);
    }

    async findAll(): Promise<User[]> {
        return await this.model.find();
    }

    async findOneById(id: string): Promise<User | null> {
        return await this.model.findOneBy({ id: parseInt(id) });
    }

    async deleteById(id: string): Promise<void> {
        await this.model.delete(id);
    }

    async addUser(user: User): Promise<User> {
        return await this.model.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.model.findOneBy({ email });
    }
}