import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    @Render('home')
    getHome() {
        return this.appService.getHomePage();
    }

    @Get('svgs/:id')
    @Render('svg')
    getSvg(@Param('id') id: string) {
        console.error(id, 'id')
        return this.appService.getSvgPage(id);
    }
}
