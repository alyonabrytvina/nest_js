import { Test, TestingModule } from '@nestjs/testing';
import { SvgsController } from './svgs.controller';

describe('ProductsController', () => {
  let controller: SvgsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvgsController],
    }).compile();

    controller = module.get<SvgsController>(SvgsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
