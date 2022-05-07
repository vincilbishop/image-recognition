import { ImageFile } from 'src/models/image-file';
import { ImageModificationInstance } from 'src/models/image-modification-instance';
import { ImageOperation } from 'src/models/image-operation';
import { MigrationInterface, QueryRunner } from 'typeorm';

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

    const modsToSave = [];

    for (const file of files) {
      for (const op1 of operations) {
        for (const op2 of operations) {
          if (op1.code !== op2.code) {
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
