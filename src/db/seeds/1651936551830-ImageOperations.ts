import { ImageOperation } from 'src/models/image-operation';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ImageOperations1651936551830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const opDb = queryRunner.connection.getRepository(ImageOperation);

    const operations = ['contrast', 'sharpen', 'despeckle', 'bgsubtract'];

    const values = [25, 50, 75, 100];

    const opsToSave = [];

    for (const op of operations) {
      if (op === 'despeckle' || op === 'bgsubtract') {
        const newOp = new ImageOperation();
        newOp.code = op;
        newOp.operationName = op;
        newOp.operationValue = 100;
        newOp.operationName = `${op} @ ${newOp.operationValue}%`;
        opsToSave.push(newOp);
      } else {
        for (const value of values) {
          const newOp = new ImageOperation();
          newOp.code = `${op}-${value}`;
          newOp.operationName = `${op} @ ${value}%`;
          newOp.operationValue = value;
          opsToSave.push(newOp);
        }
      }
    }

    await opDb.save(opsToSave);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
