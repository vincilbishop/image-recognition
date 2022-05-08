import { ImageFile } from 'src/models/image-file';
import { ImageModificationInstance } from 'src/models/image-modification-instance';
import { ImageOperation } from 'src/models/image-operation';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as jetpack from 'fs-jetpack';
import { exit } from 'process';
export class ImageModificationInstances1651938419322
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const modDb = queryRunner.connection.getRepository(
      ImageModificationInstance,
    );
    const opDb = queryRunner.connection.getRepository(ImageOperation);
    const fileDb = queryRunner.connection.getRepository(ImageFile);

    const operations = await opDb.find({});
    const files = await fileDb.find({});

    const modsToSave = [] as ImageModificationInstance[];

    for (const file of files) {
      for (const op1 of operations) {
        for (const op2 of operations) {
          if (op1.code !== op2.code && op1.operationType !== op2.operationType) {
            const newMod = new ImageModificationInstance();
            newMod.originalImageFile = file;
            newMod.imageOp1 = op1;
            newMod.imageOp2 = op2;
            newMod.subjectImageFileName = `${op1.code}-${op2.code}-${file.code}`;
            newMod.modificationDescription = `${op1.operationName} + ${op2.operationName}`;
            modsToSave.push(newMod);
          }
        }
      }
    }

    const modFiles = jetpack.list('src/images/output');

    // Let's make sure all of out files are there...
    for (const mod of modsToSave) {
      if (modFiles.indexOf(mod.subjectImageFileName) < 0) {
        console.log(`${mod.subjectImageFileName} Not Found!`)
        throw new Error(`${mod.subjectImageFileName} Not Found!`);
      }
    }

    for (const file of files) {
      const newMod = new ImageModificationInstance();
      newMod.originalImageFile = file;
      newMod.subjectImageFileName = file.code;
      newMod.modificationDescription = `Unmodified original image`;
      modsToSave.push(newMod);
    }

    await modDb.save(modsToSave);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
