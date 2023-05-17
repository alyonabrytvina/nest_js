import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SvgsModule } from './svgs/svgs.module';
import { PingController } from './ping/ping.controller';
import { SvgModule } from './svg/svg.module';

@Module({
    imports: [
        SvgsModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
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
