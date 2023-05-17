import {
    Inject,
    Injectable
} from '@nestjs/common';
import { EventEmitter } from 'events';
import { readFileSync, writeFile } from 'fs';
import * as path from 'path';
import { SvgService } from '../svg/svg.service';
import { prettifyJsonToString } from './utils/prettify-json-to-string.util';
import { PublicSvg } from '../svgs/utils/to-public-json.util';

const dbFolder = path.resolve(__dirname, '../../db/');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');

@Injectable()
export class DatabaseService extends EventEmitter {
    private likedIds = {};
    private idToSvg = {};

    private svgObj = {
        idToSvg: {},
        likedIds: {},
    };

    constructor(
        @Inject(SvgService)
        private readonly svgDb: SvgService
    ) {
        super();
    }

    async insert(svg, originalContent) {
        await svg.saveOriginal(originalContent?.content);
        const existingData = JSON.parse(readFileSync(dbDumpFile, 'utf-8'));

        this.idToSvg = {
            ...existingData.idToSvg,
            [svg.id]: svg,
        };

        this.likedIds = {
            ...existingData.likedIds
        };

        writeFile(
            dbDumpFile,
            prettifyJsonToString({
                idToSvg: this.idToSvg,
                likedIds: this.likedIds
            }),
            'utf-8',
            (err) => {
                console.error(err);
            }
        );
    }

    findById(svgId): PublicSvg {
        const dbDumpFile = path.resolve(dbFolder, 'dump.json');
        const allSvgsJson = readFileSync(dbDumpFile, 'utf-8');

        this.idToSvg = JSON.parse(allSvgsJson).idToSvg;
        const svgRaw = this.idToSvg[svgId];

        if (!svgRaw) {
            return null;
        }

        return svgRaw;
    }

    find(): any {
        const dbDumpFile = path.resolve(dbFolder, 'dump.json');
        const allSvgs = readFileSync(dbDumpFile, 'utf-8');
        this.idToSvg = JSON.parse(allSvgs);

        return JSON.parse(allSvgs);
    }

    setLiked(svgId, value = false) {
        if (value === false) {
            delete this.likedIds[svgId];
        } else {
            // this.likedIds[svgId] = true;
        }

        const existingData = JSON.parse(readFileSync(dbDumpFile, 'utf-8'));
        // const liked = this.likedIds[svgId];
        const likedSVG = Object.values(existingData.idToSvg).find((val: any) => {
            return val.id === svgId;
        });

        const newData = {
            idToSvg: {
                ...existingData.idToSvg,
            },
            likedIds: {
                ...existingData.likedIds,
                [svgId]: likedSVG,
            }
        };
        return writeFile(dbDumpFile, JSON.stringify(newData), 'utf-8', () => {
        });
    }

    async findByIdAndRemove(svgId) {
        await this.svgDb.removeOriginal(svgId);


        const dbFolder = path.resolve(__dirname, '../../db');
        const dumpFile = path.resolve(dbFolder, 'dump.json');
        const existingData = JSON.parse(readFileSync(dbDumpFile, 'utf-8'));

        const newObj = {
            idToSvg: {},
            likedIds: {},
        };

        const svgs = Object.values(existingData.idToSvg)?.filter((obj: any) => {
            return obj.id !== svgId;
        });

        svgs.forEach((raw: any) => {
            newObj.idToSvg = {
                ...newObj.idToSvg,
                [raw.id]: raw
            };
        });

        const likedIds = Object.values(existingData.likedIds)?.filter((obj: any) => {
            return obj.id !== svgId;
        });

        likedIds.forEach((raw: any) => {
            newObj.likedIds = {
                ...newObj.likedIds,
                [raw.id]: raw
            };
        });

        writeFile(dumpFile, prettifyJsonToString(newObj), (err) => {
            console.error(err);
        });
    }

    toJSON() {
        return {
            idToSvg: this.idToSvg,
            likedIds: this.likedIds,
        };
    }
}
