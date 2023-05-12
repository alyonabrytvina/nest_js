import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import * as process from 'process';

// концепт - декораторы, экспортируем класс, который украшаем декоратором.
// Тут используем декоратор @Module
// В массив imports передаем другие модули, которые хотим подключить

@Module({
    imports: [
        ProductsModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(
            `mongodb+srv://Alona:${process.env.MONGO_PSW}@cluster0.dhqdfve.mongodb.net/?retryWrites=true&w=majority`
        )
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
