import { Module } from '@nestjs/common';
import { SvgsController } from './svgs.controller';
import { SvgsService } from './svgs.service';
import { DatabaseModule } from '../database/database.module';
import { SvgModule } from '../svg/svg.module';

@Module({
    controllers: [SvgsController],
    providers: [SvgsService],
    imports: [DatabaseModule, SvgModule],
    exports: [SvgsService]
})

export class SvgsModule {}
