import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Svg, SvgDocument } from './schemas/svg.schema';
import { CreateSvgDto } from './dto/create-svg.dto';

@Injectable()
export class SvgService {

    constructor(
        @InjectModel(Svg.name)
        private svgModel: Model<SvgDocument>,
    ) {
    }

    async getAll(): Promise<any> {
        const svgsArr = [];
        await this.svgModel.find().exec().then(data => svgsArr.push(...data));

        const allSvgs = svgsArr?.map((obj: any) => {
            return {
                id: obj._id.toString(),
                svg: JSON.parse(obj.svg).content
            };
        });

        const likedSvgs = svgsArr?.map(obj => {
            if (obj.liked) {
                return {
                    id: obj._id.toString(),
                    svg: JSON.parse(obj.svg).content
                };
            }
        }).filter(svg => !!svg);

        return {allSvgs, likedSvgs};
    }

    async getById(id: string): Promise<any> {
        const svgObj = await this.svgModel.findById(id);

        const svg = {
            id: svgObj._id.toString(),
            svg: JSON.parse(svgObj.svg).content
        };

        return {svg};
    }

    async create(svgDto: CreateSvgDto): Promise<any> {
        await this.svgModel.create({
            svg: JSON.stringify(svgDto),
            liked: false,
        });
    }

    async setLiked(id: string): Promise<any> {
        const svg = await this.svgModel.findById(id);

        await this.svgModel.findByIdAndUpdate(id, {
            liked: !svg.liked,
        });
    }

    async remove(id: string): Promise<any> {
        await this.svgModel.findByIdAndRemove(id);
    }
}