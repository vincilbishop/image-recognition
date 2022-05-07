import { ImageFile } from "src/models/image-file";
import {MigrationInterface, QueryRunner} from "typeorm";
import * as jetpack from 'fs-jetpack';

export class ImageFiles1651935900627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fileDb = queryRunner.connection.getRepository(ImageFile)

        const files = jetpack.list('src/images/base-input')
        console.log(files)

        const filesToSave = [];

        for (const file of files) {
            if (file.toLowerCase().indexOf('.jpg') > -1) {
                const newFile = new ImageFile()
                newFile.code = file
                filesToSave.push(newFile)
            }
        }

        await fileDb.save(filesToSave)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
