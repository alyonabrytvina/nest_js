import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SvgModule } from './svg/svg.module';
import { PingController } from './ping/ping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SvgController } from './svg/svg.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        SvgModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
    ],
    controllers: [AppController, PingController, SvgController],
    providers: [AppService]
})

export class AppModule {
}
