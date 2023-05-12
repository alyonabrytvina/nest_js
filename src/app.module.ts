import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

// концепт - декораторы, экспортируем класс, который украшаем декоратором.
// Тут используем декоратор @Module
// В массив imports передаем другие модули, которые хотим подключить

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forRoot(
            `mongodb+srv://Alona:Eg6J0HmJtfWcoc4N@cluster0.dhqdfve.mongodb.net/?retryWrites=true&w=majority`
        )
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
