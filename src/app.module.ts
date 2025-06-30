import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RedirectMiddleware } from './common/middleware/redirect.middleware';
import { UserController } from './user/user.controller';
import { PathMiddleware } from './common/middleware/path.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ // Cấu hình kết nối database
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Tự động tìm kiếm tất cả các entity trong project
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Neu nhu co nhieu hon 1 middleware => them cac middleware khac sau dau ','
      .forRoutes(UserController); // Chi dinh route = controller (De ap dung cho toan bo route => su dung forRoute('*'))
    consumer
      .apply(RedirectMiddleware)
      .forRoutes(AppController);
    consumer
      .apply(PathMiddleware)
      .forRoutes({
        path: 'v1/*splat',      // Ap dung cho cac route co diem chung la v1/....
        method: RequestMethod.ALL // Ap dung cho toan bo method (Co the chi dich danh method = cach RequestMethod.GET, RequestMethod.POST, ...)
      });
  }
}
