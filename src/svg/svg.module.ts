import { Module } from '@nestjs/common';
import { SvgController } from './svg.controller';
import { SvgService } from './svg.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Svg, SvgSchema } from './schemas/svg.schema';

@Module({
    controllers: [SvgController],
    providers: [SvgService],
    exports: [SvgService],
    imports: [
        MongooseModule.forFeature([{
            name: Svg.name,
            schema: SvgSchema
        }])
    ]
})

export class SvgModule {
}
