import { Inject, Injectable } from '@nestjs/common';
import { SvgsService } from './svgs/svgs.service';

@Injectable()
export class AppService {

    constructor(
        @Inject(SvgsService)
        private svgsService: SvgsService
    ) {
    }

    getHomePage() {
        return this.svgsService.getAll();
    }

    async getSvgPage(id: string): Promise<any> {
        const svg = await this.svgsService.getById(id);
        return { svg };
    }
}
