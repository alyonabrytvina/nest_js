import { Module } from '@nestjs/common';
import { SvgService } from './svg.service';

@Module({
    controllers: [],
    providers: [SvgService],
    exports: [SvgService]
})

export class SvgModule {}
