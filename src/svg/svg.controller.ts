import { Controller, Get } from '@nestjs/common';

@Controller('svg')
export class SvgController {
    // constructor(private myService: MyService) {}

    @Get()
    getOneSvg() {
        // this.myService.doSomething();
        return 'Endpoint response';
    }
}