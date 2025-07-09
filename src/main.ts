import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // Tên này sẽ dùng ở @ApiBearerAuth()
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Bỏ field không có trong DTO
    forbidNonWhitelisted: true, // Nếu có field không có trong DTO thì trả về lỗi
    transform: true, // Chuyển đổi dữ liệu từ string sang number, boolean, ...
  }));

  // app.useGlobalFilters(new HttpExceptionFilter()); // Áp dụng global filter cho toàn bộ controller

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
