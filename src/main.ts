import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true, // 데코레이터가 없는 속성은 거름
    forbidNonWhitelisted: true, // 데코레이터가 없는 속성이 있으면 리퀘스트 자체를 막음
    transform: true, // 유저가 보낸 것을 우리가 원하는 타입으로 변환
  }) ); // 유효성 검사
  await app.listen(3000);
}
bootstrap();
