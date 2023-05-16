import { Inject, Injectable } from '@nestjs/common';
import { CreateSvgDto } from './dto/create-svg.dto';
import { SvgService } from '../svg/svg.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SvgsService {
    constructor(
        @Inject(DatabaseService)
        private database: DatabaseService,
        @Inject(SvgService)
        private Svg: SvgService
    ) {
    }

     getAll(): any {
        return this.database.find()?.idToSvg || {};
    }

    async getById(id: string): Promise<SvgService> {
        return this.database.findById(id);
    }

    async create(svgDto: CreateSvgDto): Promise<any> {
        const svgFile = new SvgService();
        await this.database.insert(svgFile, svgDto);
    }

    // async update(id: string): Promise<any> {
    //     await this.database.setLiked(id, false)
    // }
}