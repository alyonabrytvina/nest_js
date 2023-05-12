import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//  Контроллер работает с перенаправлениями, Не обрабатывает логику!

//  экспортируем класс AppController и украшаем его декоратором @Controller
//  реализация концепции dependencie injection:
//  constructor(private readonly appService: AppService)
//  инджектируем тип appService, чтобы мы могли его использовать в классе
//  у нас один метод getHello(), украшаем его декоратором @Get(), чтобы
//  было понятно какой тип-метод запроса мы ожидаем

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello NestJS';
  }
}
