import { Injectable } from '@nestjs/common';
import { BackgroundSubtractionService } from './services/modifications/background-subtraction/background-subtraction.service';
import { Convertible } from './services/modifications/common/convertible';
import { ContrastService } from './services/modifications/contrast/contrast.service';
import { DespeckleService } from './services/modifications/despeckle/despeckle.service';
import { SharpenService } from './services/modifications/sharpen/sharpen.service';

@Injectable()
export class AppService {
  constructor(
    private readonly contrastService: ContrastService,
    private readonly sharpenService: SharpenService,
    private readonly despeckleService: DespeckleService,
    private readonly bgsubtractService: BackgroundSubtractionService) {}
  async processImages() {
    const services: Convertible[] = [
      // this.contrastService,
      // this.sharpenService,
      // this.despeckleService,
      this.bgsubtractService,
    ];
    for (const service of services) {
      await service.convert();
    }
  }
}