import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import { writeFile} from 'fs';

@Injectable()
export class SvgService {
    private id: string;
    private createdAt: number;
    private originalFilename: string;

    constructor() {
        this.id = uuidv4();
        this.createdAt =  Date.now();
        this.originalFilename = `${this.id}_original.svg`;
    }

    async saveOriginal(content: string | Buffer) {
        const dbFolder = resolve(__dirname, '../../db/');
        const svgFolder = resolve(dbFolder, 'svg');
        const path = resolve(svgFolder, this.originalFilename)

        await writeFile(path, content, 'utf-8', (error) => {
            console.error(error)
        });
    }

    // async removeOriginal() {
    //     await unlinkFileAsync(resolve(svgFolder, this.originalFilename))
    // }

    toPublicJSON() {
        return {
            id: this.id,
            originalUrl: `/files/${this.id}_original.svg`,
            createdAt: this.createdAt,
        };
    }

    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
        };
    }
}
