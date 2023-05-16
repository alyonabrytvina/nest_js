import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SvgsModule } from './svgs/svgs.module';
import { PingController } from './ping/ping.controller';
import { SvgModule } from './svg/svg.module';
import * as process from 'process';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        SvgsModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(
            `mongodb+srv://Alona:${process.env.MONGO_PSW}@cluster0.dhqdfve.mongodb.net/?retryWrites=true&w=majority`
        ),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../db/svg'),
            serveRoot: '/files',
        }),
        SvgModule
    ],
    controllers: [AppController, PingController],
    providers: [AppService],
})

export class AppModule {
}
