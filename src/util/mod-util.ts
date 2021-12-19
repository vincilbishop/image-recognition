import { ConfigUtil } from './config-util';
import { ImageUtil } from './image-util';

export class ModUtil {
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
          await callback(ConfigUtil.getImageInputPath(image), ConfigUtil.getImageOutputPath(image, modifier), percent);
      }
    }
  }

  static async iterateFiles(
    operation: string,
    callback: (inputPath, outputPath) => Promise<void>,
  ) {
    const modifier = `${operation}`;
      for (const image of ImageUtil.inputFiles) {
          await callback(ConfigUtil.getImageInputPath(image), ConfigUtil.getImageOutputPath(image, modifier));
      }
  }
}
