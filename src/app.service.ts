import { Injectable } from '@nestjs/common';
import { ImageModificationInstance } from './models/image-modification-instance';
import { ImageModificationInstanceLabel } from './models/image-modification-instance-label';
import { ImageModificationInstanceObject } from './models/image-modification-instance-object';
import { BackgroundSubtractionService } from './services/modifications/background-subtraction/background-subtraction.service';
import { Convertible } from './services/modifications/common/convertible';
import { ContrastService } from './services/modifications/contrast/contrast.service';
import { DespeckleService } from './services/modifications/despeckle/despeckle.service';
import { SharpenService } from './services/modifications/sharpen/sharpen.service';
import { RecognitionService } from './services/recognition/recognition.service';
import pLimit from 'p-limit';
import * as stats from 'simple-statistics';

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

    const limit = pLimit(25);
    const input = [];

    for (const mod of mods) {
      input.push(
        limit(async () => {
          // Call Google Vision Service
          const labelResults = await this.visionService.annotateImage(
            mod.subjectImageFilePath,
          );
          const objectResults = await this.visionService.detectObjects(
            mod.subjectImageFilePath,
          );

          for (const label of labelResults) {
            label.modification = mod;
            // labelsToSave.push(label);
            await ImageModificationInstanceLabel.save(
              label as ImageModificationInstanceLabel,
            );
          }

          // average label score

          for (const obj of objectResults) {
            obj.modification = mod;
            // objectsToSave.push(obj);
            await ImageModificationInstanceObject.save(
              obj as ImageModificationInstanceObject,
            );
          }

          const labelScores = labelResults.map((r) => r.score);
          const objectScores = objectResults.map((r) => r.score);

          if (labelScores.length > 0) {
            // average_label_score
            mod.averageLabelScore = stats.mean(labelScores);
            // stdv_label_score
            mod.stdvLabelScore = stats.standardDeviation(labelScores);
            // detected_label_count
            mod.detectedLabelCount = labelResults.length;
          }

          if (objectScores.length > 0) {
            // average_object_score
            mod.averageObjectScore = stats.mean(objectScores);
            // stdv_object_score
            mod.stdvObjectScore = stats.standardDeviation(objectScores);
            // detected_object_count
            mod.detectedObjectCount = objectResults.length;
          }

          const allScores = [...labelScores, ...objectScores];

          if (allScores.length > 0) {
            // average_detected_score
            mod.averageDetectedScore = stats.mean(allScores);
            // stdv_detected_score
            mod.stdvDetectedScore = stats.standardDeviation(allScores);
            // detected_total_count
            mod.detectedTotalCount = allScores.length;
          }

          await ImageModificationInstance.save(mod);
        }),
      );
    }

    await Promise.all(input);
  }
}
