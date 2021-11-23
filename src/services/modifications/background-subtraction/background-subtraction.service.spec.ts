import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundSubtractionService } from './background-subtraction.service';

describe('BackgroundSubtractionService', () => {
  let service: BackgroundSubtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundSubtractionService],
    }).compile();

    service = module.get<BackgroundSubtractionService>(BackgroundSubtractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
