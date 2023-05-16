import {
    Controller, Get, Param, Post,
    Delete, Put, Body, HttpCode,
    Header, HttpStatus,
} from '@nestjs/common';
import { CreateSvgDto } from './dto/create-svg.dto';
import { SvgsService } from './svgs.service';
import { SvgService } from '../svg/svg.service';
import { UpdateSvgDto } from './dto/update-svg.dto';

@Controller('api/svgs')
export class SvgsController {

    constructor(private readonly svgsService: SvgsService) {
    }

    @Get()
    getAll(): Promise<SvgService[]> {
        return this.svgsService.getAll();
    }


    @Get(':id')
    getOne(@Param('id') id: string): Promise<SvgService> {
        return this.svgsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateSvgDto): Promise<SvgService> {
        return this.svgsService.create(createProductDto);
    }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string): Promise<Svg> {
    //     return this.svgsService.remove(id);
    // }
    //
    // @Put(':id')
    // update(
    //     @Body() updateProductDto: UpdateSvgDto,
    //     @Param('id') id: string
    // ): Promise<SvgService> {
    //     // return this.svgsService.update(id);
    // }
}
