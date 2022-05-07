
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseModel } from './base-model';

export class BaseModelTimedate extends BaseModel {
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
