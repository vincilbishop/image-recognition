import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseModelTimedate } from './base-model-timedate';

export class BaseModelPrimaryId extends BaseModelTimedate {
  @PrimaryGeneratedColumn()
  id: number;
}
