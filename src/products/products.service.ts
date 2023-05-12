import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

// сервисы обрабатывают логику приложения
// сервисы необходимо регистрировать как провайдеры в модулях (app.module.ts)
// пока не подключили БД, будем здесь работать с мок данными

// после создания код необходимо инджектировать в контроллер с помощью конструктора
@Injectable()
export class ProductsService {
    private products = [];

    // инджектируем в конструктор нашу модель, передаем Product.name, говорим какую
    // модель из какой коллекции необходимо проинджектировать
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<ProductDocument>
    ) {
    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto);
        return newProduct.save();
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id);
    }

    async update(
        id: string,
        productDto: UpdateProductDto
    ): Promise<Product> {
        //  3й параметр options, если такая модель не была найдена,
        //  то мы ее создадим
        return this.productModel.findByIdAndUpdate(
            id,
            productDto,
            {new: true}
        );
    }
}