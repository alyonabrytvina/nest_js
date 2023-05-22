import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SvgModule } from './svg/svg.module';
import { PingController } from './ping/ping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SvgController } from './svg/svg.controller';

@Module({
    imports: [
        SvgModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../db/svg'),
            serveRoot: '/files',
        }),
    ],
    controllers: [AppController, PingController, SvgController],
    providers: [AppService],
})

export class AppModule {
}
