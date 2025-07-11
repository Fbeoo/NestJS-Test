import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
  
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đánh dấu class User là một entity
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
