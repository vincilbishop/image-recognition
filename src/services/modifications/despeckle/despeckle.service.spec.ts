import { Test, TestingModule } from '@nestjs/testing';
import { DespeckleService } from './despeckle.service';

describe('DespeckleService', () => {
  let service: DespeckleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespeckleService],
    }).compile();

    service = module.get<DespeckleService>(DespeckleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should despeckle images', async () => {
    return service.convert();
  }, 30000);
});
