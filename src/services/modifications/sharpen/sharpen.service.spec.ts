import { Test, TestingModule } from '@nestjs/testing';
import { SharpenService } from './sharpen.service';

describe('SharpenService', () => {
  let service: SharpenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharpenService],
    }).compile();

    service = module.get<SharpenService>(SharpenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sharpen images', async () => {
    return service.convert();
  }, 300000);
});
