import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Render,
} from '@nestjs/common';
import { SvgService } from './svg.service';
import { CreateSvgDto } from './dto/create-svg.dto';
import { UpdateSvgDto } from './dto/update-svg.dto';

@Controller('api/svgs')
export class SvgController {

    constructor(private readonly svgsService: SvgService) {
    }

    @Get()
    @Render('home')
    getAll(): Promise<CreateSvgDto[]> {
        return this.svgsService.getAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateSvgDto): Promise<void> {
        return this.svgsService.create(createProductDto);
    }

    @Get(':id')
    @Render('svg')
    getOne(@Param('id') id: string): Promise<any> {
        return this.svgsService.getById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.svgsService.remove(id);
    }

    @Put(':id')
    update(
        @Body() updateProductDto: UpdateSvgDto,
        @Param('id') id: string
    ): Promise<void> {
        return this.svgsService.setLiked(id);
    }
}
