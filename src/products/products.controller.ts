import {
    Controller, Get, Param, Post,
    Delete, Put, Body, Redirect,
    HttpCode, Header, HttpStatus,
    Req, Res
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {
    }

    // @Get()
    // @Redirect('https://www.google.com/', 301)
    // getAll(@Req() req: Request, @Res() res: Response): string {
    //     res.status(201).end('Poka');
    //     return 'getAll';
    // }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productsService.getAll();
    }


    //  используем декоратор  @Get и говорим ему что нам нужен парам :id,
    //  и предаем в метод декоратор @Param() и говорим какую переменную
    //  мы хоти обернуть. Если добавим 'id', то сможем четко указать
    //  какое именно свойство нам нужно получить из объекта params
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.getById(id);
    }

    // чтобы получить тело запроса нужно обернуть в декоратор,
    // который называется  @Body() и указываем body, параметр,
    // который хотим получить из тела запроса. После создания DTO
    // меняем body на CreateProductDto
    // В методе Post, когда мы что-то создаем нужно указать
    // statusCode = 201 (created). В Express.js - res.status(201),
    // в NestJS - @HttpCode(HttpStatus.CREATED), также можно добавлять
    // определенные хедеры на запрос
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id);
    }

    @Put(':id')
    update(
        @Body() updateProductDto: UpdateProductDto,
        @Param('id') id: string
    ): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }
}
