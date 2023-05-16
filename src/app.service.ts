import { Inject, Injectable } from '@nestjs/common';
import { SvgsService } from './svgs/svgs.service';

const toPublicJSON = (object) => {
    return Object.values(object)
        .map((svg: any) => svg)
        .map(svgObj => {
            if(svgObj.id) {
                return {
                    id: svgObj.id,
                    originalUrl: `/files/${svgObj.id}_original.svg`,
                    createdAt: svgObj.createdAt,
                }
            }
        });
}

@Injectable()
export class AppService {

  constructor(
      @Inject(SvgsService)
      private svgsSevice: SvgsService
  ) {
  }
  getHomePage() {
    const svgsObject = this.svgsSevice.getAll();
    const allSvgs = toPublicJSON(svgsObject);

    return { allSvgs };
  }

  async getSvgPage(id: string) {
      const svgObject = await this.svgsSevice.getById(id);
      const svg = toPublicJSON(svgObject);

      return { svg }
  }
}
