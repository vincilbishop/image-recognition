import * as path from 'path';

export class ConfigUtil {

    static getImageInputPath(imageFilename: string) {
        return path.join(this.inputPath, imageFilename);
    }

    static getImageOutputPath(imageFilename: string, modifier: string) {
        return path.join(this.outputPath, `${modifier}-${imageFilename}`);
    }

    static get inputPath() {
        const imageInputPath = path.join(__dirname, '../images/base-input/');
        return imageInputPath;
    }

    static get outputPath() {
        const imageInputPath = path.join(__dirname, '../images/input/');
        return imageInputPath;
    }

    // static get inputPath() {
    //     const imageInputPath = path.join(__dirname, '../images/input/');
    //     return imageInputPath;
    // }

    // static get outputPath() {
    //     const imageInputPath = path.join(__dirname, '../images/output/');
    //     return imageInputPath;
    // }
}