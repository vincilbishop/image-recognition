import { Injectable } from '@nestjs/common';
import { ModUtil } from '../../../util/mod-util';
import { Convertible } from '../common/convertible';
import * as im from 'imagemagick';
@Injectable()
export class SharpenService implements Convertible {
    async convert() {
        await ModUtil.iterateFilesAndModPercents('sharpen', (inputPath, outputPath, percent) => {
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
          [input, '-sharpen', `${percent}`, output],
          (err, stdout) => {
            if (err) reject(err);
            resolve(stdout);
          },
        );
      });
    }
}
