import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { readFileSync, writeFile } from 'fs';
import * as path from 'path';

const dbFolder = path.resolve(__dirname, '../../db/');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');

const prettifyJsonToString = (json) => JSON.stringify(json, null, '\t');

@Injectable()
export class DatabaseService extends EventEmitter {
    private likedIds = {};
    private idToSvg = {};

    constructor(
        // @Inject(SvgService)
        // private readonly svgDb: SvgService
    ) {
        super();
    }

    async insert(svg, originalContent) {
        await svg.saveOriginal(originalContent?.content);

        this.idToSvg[svg.id] = svg;
        const existingData = JSON.parse(readFileSync(dbDumpFile, 'utf-8'));


        const newData = {
            idToSvg: {
                ...existingData.idToSvg,
                [svg.id]: svg,
            },
            likedIds: {
                ...existingData.likedIds
            }
        };

        writeFile(dbDumpFile, prettifyJsonToString(newData), 'utf-8', () => {
        });
    }

    findById(svgId) {
        const dbDumpFile = path.resolve(dbFolder, 'dump.json');
        let allSvgs = readFileSync(dbDumpFile, 'utf-8');
        this.idToSvg = JSON.parse(allSvgs).idToSvg;

        const svgRaw = this.idToSvg[svgId];

        if (!svgRaw) {
            return null;
        }
        return svgRaw;
    }

    find(isLiked = false): any {
        const dbDumpFile = path.resolve(dbFolder, 'dump.json');
        let allSvgs = readFileSync(dbDumpFile, 'utf-8');
        // let all = Object.values(allSvgs);
        // if (isLiked === true) {
        //     allSvgs = allSvgs.filter((svg: any) => this.likedIds[svg.id]);
        // }
        //
        // allSvgs.sort((svgA: any, svgB: any) => svgB.createdAt - svgA.createdAt);

        this.idToSvg = JSON.parse(allSvgs);
        return JSON.parse(allSvgs);
    }

    setLiked(svgId, value) {
        if (value === false) {
            delete this.likedIds[svgId];
        } else {
            this.likedIds[svgId] = true;
        }

        const existingData = JSON.parse(readFileSync(dbDumpFile, 'utf-8'));

        const liked = this.likedIds[svgId];

        const newData = {
            // idToSvg: {
            //     ...existingData.idToSvg,
            // },
            // likedIds: {
            //     ...existingData.likedIds
            // }
        };
        console.error(newData)
        return writeFile(dbDumpFile, JSON.stringify(newData), 'utf-8', () => {})
    }

    toJSON() {
        return {
            idToSvg: this.idToSvg,
            likedIds: this.likedIds,
        };
    }
}
