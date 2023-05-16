import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SvgModule } from '../svg/svg.module';

@Module({
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService],
    imports: [SvgModule]
})

export class DatabaseModule {}
