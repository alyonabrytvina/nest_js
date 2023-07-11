import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Svg, SvgDocument } from './schemas/svg.schema';
import { CreateSvgDto } from './dto/create-svg.dto';

const toPublicSvg = (svg) => {
    return {
        id: svg._id.toString(),
        svg: JSON.parse(svg.svg).content,
        liked: svg.liked,
        createdAt: svg.createdAt
    };
};

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

        const allSvgs = svgsArr?.map((svgRow) => {
            return toPublicSvg(svgRow);
        }).sort((a, b) => {
            console.error(a.createdAt, b.createdAt);
            if (a.createdAt === undefined) {
                a.createdAt = 0;
            }

            if (b.createdAt === undefined) {
                b.createdAt = 0;
            }
            return b.createdAt - a.createdAt;
        });

        const likedSvgs = svgsArr?.map(svgRow => {
            if (svgRow.liked) {
                return toPublicSvg(svgRow);
            }
        })
            .filter(svg => !!svg)
            .sort((a, b) => {
                if (a.createdAt === undefined) {
                    a.createdAt = 0;
                }

                if (b.createdAt === undefined) {
                    b.createdAt = 0;
                }
                return b.createdAt - a.createdAt;
            });

        return {
            allSvgs,
            likedSvgs,
        };
    }

    async getById(id: string): Promise<any> {
        const svgRow = await this.svgModel.findById(id);
        const svg = toPublicSvg(svgRow);

        return {svg};
    }

    async create(svgDto: CreateSvgDto): Promise<void> {
        await this.svgModel.create({
            svg: JSON.stringify(svgDto),
            liked: false,
            createdAt: new Date()
        });
    }

    async setLiked(id: string): Promise<void> {
        const svg = await this.svgModel.findById(id);

        await this.svgModel.findByIdAndUpdate(id, {
            liked: !svg.liked,
        });
    }

    async remove(id: string): Promise<void> {
        await this.svgModel.findByIdAndRemove(id);
    }
}
