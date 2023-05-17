import { Inject, Injectable } from '@nestjs/common';
import { CreateSvgDto } from './dto/create-svg.dto';
import { SvgService } from '../svg/svg.service';
import { DatabaseService } from '../database/database.service';
import { PublicSvg, Svg, toPublicJSON } from './utils/to-public-json.util';

@Injectable()
export class SvgsService {

    constructor(
        @Inject(DatabaseService)
        private database: DatabaseService,
    ) {
    }

    getAll(): any {
        const svgDumpObject = this.database.find();

        const allSvgs = Object.values(svgDumpObject.idToSvg)
            .map((svg: Svg) => toPublicJSON(svg));
        const likedSvgs = Object.values(svgDumpObject.likedIds)
            .map((svg: Svg) => toPublicJSON(svg));

        return { allSvgs, likedSvgs };
    }

    async getById(id: string): Promise<PublicSvg> {
        const svg = await this.database.findById(id);
        return toPublicJSON(svg);
    }

    async create(svgDto: CreateSvgDto): Promise<any> {
        const svgFile = new SvgService();
        await this.database.insert(svgFile, svgDto);
    }

    async update(id: string): Promise<any> {
        await this.database.setLiked(id, false);
    }

    async remove(id: string): Promise<any> {
        await this.database.findByIdAndRemove(id);
    }
}