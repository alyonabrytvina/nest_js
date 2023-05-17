import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const dbFolder = path.resolve(__dirname, '../../db/');
const svgFolder = path.resolve(dbFolder, 'svg');

@Injectable()
export class SvgService {
    private id: string;
    private createdAt: number;
    private originalFilename: string;

    constructor() {
        this.id = uuidv4();
        this.createdAt = Date.now();
        this.originalFilename = `${this.id}_original.svg`;
    }

    async saveOriginal(content) {
        const svgPath = path.resolve(svgFolder, this.originalFilename);

        await fs.writeFile(svgPath, content, 'utf-8', (error) => {
            console.error(error);
        });
    }

    async removeOriginal(svgId) {
        const svgPath = path.resolve(svgFolder, `${svgId}_original.svg`);

        await fs.unlink(svgPath, (error) => {
            console.error(error);
        });
    }
}
