import { Injectable } from '@nestjs/common';
import { ImageModificationInstance } from './models/image-modification-instance';
import { ImageModificationInstanceLabel } from './models/image-modification-instance-label';
import { BackgroundSubtractionService } from './services/modifications/background-subtraction/background-subtraction.service';
import { Convertible } from './services/modifications/common/convertible';
import { ContrastService } from './services/modifications/contrast/contrast.service';
import { DespeckleService } from './services/modifications/despeckle/despeckle.service';
import { SharpenService } from './services/modifications/sharpen/sharpen.service';
import { RecognitionService } from './services/recognition/recognition.service';

@Injectable()
export class AppService {
  constructor(
    private readonly contrastService: ContrastService,
    private readonly sharpenService: SharpenService,
    private readonly despeckleService: DespeckleService,
    private readonly bgsubtractService: BackgroundSubtractionService,
    private readonly visionService: RecognitionService,
  ) {}
  async processImages() {
    const services: Convertible[] = [
      this.contrastService,
      this.sharpenService,
      this.despeckleService,
      this.bgsubtractService,
    ];
    for (const service of services) {
      await service.convert();
    }
  }

  async annotateImages() {
    // Get Image Modifications
    const mods = await ImageModificationInstance.find({});
    const labelsToSave = [];
    // For Each Image Modification
    // const slicedMods = mods.slice(0, 3)
    // console.log(slicedMods)
    for (const mod of mods) {
      // Call Google Vision Service
      const results = await this.visionService.annotateImage(mod.subjectImageFilePath);
      // Get Image Result
      // Save Image Modification
     
      for (const label of results) {
        label.modification = mod;
        labelsToSave.push(label);
      }
      
    }

    await ImageModificationInstanceLabel.save(labelsToSave);
  }
}
