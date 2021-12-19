import { Logger } from '@nestjs/common';
import { ConfigUtil } from './config-util';
import { ImageUtil } from './image-util';

export class ModUtil {

  static logger = new Logger('ModUtil');

  static get modPercents() {
    return [25, 50, 75, 100];
  }

  static async iterateFilesAndModPercents(
    operation: string,
    callback: (inputPath, outputPath, percent) => Promise<void>,
  ) {
    for (const percent of ModUtil.modPercents) {
      const modifier = `${operation}-${percent}`;
      for (const image of ImageUtil.inputFiles) {
        // Let's make sure we are not performing operations on images 
        // that have already been processing using the current operation 
        if (image.indexOf(operation) === -1) { 
          this.logger.log(`processing: ${image} for ${operation} @ ${percent}%`);
          await callback(ConfigUtil.getImageInputPath(image), ConfigUtil.getImageOutputPath(image, modifier), percent);
        } else {
          this.logger.debug(`skipping: ${image}`);
        }
      }
    }
  }

  // static async iterateFilesAndModPercents(
  //   operation: string,
  //   callback: (inputPath, outputPath, percent) => Promise<void>,
  // ) {
  //   for (const percent of ModUtil.modPercents) {
  //     const modifier = `${operation}-${percent}`;
  //     for (const image of ImageUtil.inputFiles) {
  //         await callback(ConfigUtil.getImageInputPath(image), ConfigUtil.getImageOutputPath(image, modifier), percent);
  //     }
  //   }
  // }

  static async iterateFiles(
    operation: string,
    callback: (inputPath, outputPath) => Promise<void>,
  ) {
    const modifier = `${operation}`;
      for (const image of ImageUtil.inputFiles) {
        // Let's make sure we are not performing operations on images 
        // that have already been processing using the current operation 
        if (image.indexOf(operation) === -1) {
          this.logger.log(`processing: ${image} for ${operation}`);
          await callback(ConfigUtil.getImageInputPath(image), ConfigUtil.getImageOutputPath(image, modifier));
        } else {
          this.logger.debug(`skipping: ${image}`);
        }
      }
  }
}
