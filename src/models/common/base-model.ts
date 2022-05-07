import { Logger } from '@nestjs/common';
import { BaseEntity, Column } from 'typeorm';

export class BaseModel extends BaseEntity {
  get metaData(): any {
    try {
      return JSON.parse(this.metaDataString);
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  set metaData(value: any) {
    this.metaDataString = JSON.stringify(value);
  }

  private logger = new Logger(this.constructor.name);

  @Column({ nullable: true, unique: false, type: 'text', name: 'meta_data' })
  metaDataString: string;

  @Column({ nullable: true, unique: false, length: 256 })
  tag: string;
}
