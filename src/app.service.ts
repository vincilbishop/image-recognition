import { Injectable } from '@nestjs/common';
import { Convertible } from './services/modifications/common/convertible';
import { ContrastService } from './services/modifications/contrast/contrast.service';
import { SharpenService } from './services/modifications/sharpen/sharpen.service';

@Injectable()
export class AppService {
  constructor(private readonly contrastService: ContrastService,private readonly sharpenService: SharpenService) {}
  async processImages() {
    const services: Convertible[] = [
      this.contrastService,
      this.sharpenService,
    ];
    for (const service of services) {
      await service.convert();
    }
  }
}
