import { Injectable } from '@nestjs/common';
import { ModUtil } from '../../../util/mod-util';
import { Convertible } from '../common/convertible';
import * as im from 'imagemagick';
@Injectable()
export class DespeckleService implements Convertible {
    async convert() {
        await ModUtil.iterateFiles('despeckle', (inputPath, outputPath) => {
            return this.convertImage(
              inputPath,
              outputPath,
              0
            );
        })
    }
  
    async convertImage(input: string, output: string, percent: number) {
      return new Promise<any>((resolve, reject) => {
        im.convert(
          [input, '-despeckle', output],
          (err, stdout) => {
            if (err) reject(err);
            resolve(stdout);
          },
        );
      });
    }
}
