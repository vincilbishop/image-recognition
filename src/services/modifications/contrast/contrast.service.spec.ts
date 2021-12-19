import { Test, TestingModule } from '@nestjs/testing';
import { ContrastService } from './contrast.service';

describe('ContrastService', () => {
  let service: ContrastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContrastService],
    }).compile();

    service = module.get<ContrastService>(ContrastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should adjust contrast', async () => {
    return service.convert();
  }, 30000);
});
