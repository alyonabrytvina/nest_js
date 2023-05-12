import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  основной файл, создаем обертку в виде функции bootstrap,
//  чтобы использовать синтаксис async/await. NestFactory
//  создаст главный модуль AppModule, после запускаем сервер
//  на порту 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
