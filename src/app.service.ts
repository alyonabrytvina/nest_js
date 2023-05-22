import { Inject, Injectable } from '@nestjs/common';
import { SvgService } from './svg/svg.service';

@Injectable()
export class AppService {

    constructor(
    ) {
    }

    async getHomePage() {
        return 'this.svgsService.getAll()';
    }

    // async getSvgPage(id: string): Promise<{ svg: PublicSvg }> {
    //     const svg = await this.svgsService.getById(id);
    //     return { svg };
    // }
}
