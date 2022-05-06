import { Injectable } from '@nestjs/common';
import { ModUtil } from '../../../util/mod-util';
import { exec } from 'child_process';

@Injectable()
export class BackgroundSubtractionService {
    async convert() {
        await ModUtil.iterateFiles('bgsubtract', (inputPath, outputPath) => {
            return this.convertImage(
              inputPath,
              outputPath,
              0
            );
        })
    }
  
    async convertImage(input: string, output: string, percent: number) {
      return new Promise<any>((resolve, reject) => {
        const command = `backgroundremover -i "${input}" -o "${output}"`;
        console.log(command);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error)
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                reject(stderr)
            }
            resolve(stdout)
        });
      });
    }
}
