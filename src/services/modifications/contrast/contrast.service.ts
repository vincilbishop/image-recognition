import { Injectable } from '@nestjs/common';
import * as im from 'imagemagick';
import { ModUtil } from '../../../util/mod-util';
import { Convertible } from '../common/convertible';

@Injectable()
export class ContrastService implements Convertible {
  async convert() {
      await ModUtil.iterateFilesAndModPercents('contrast', (inputPath, outputPath, percent) => {
          return this.convertImage(
            inputPath,
            outputPath,
            percent,
          );
      })
  }

  async convertImage(input: string, output: string, percent: number) {
    return new Promise<any>((resolve, reject) => {
      im.convert(
        [input, '-brightness-contrast', `0x${percent}`, output],
        (err, stdout) => {
          if (err) reject(err);
          resolve(stdout);
        },
      );
    });
  }
}
