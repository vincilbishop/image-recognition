
import { Column } from 'typeorm';
import { BaseModelTimedate } from './base-model-timedate';


export class BaseModelPrimaryCode extends BaseModelTimedate {

  @Column({ nullable: false, unique: true, length: 256, primary: true })
  code: string;

  @Column({ name: 'display_name', nullable: true, unique: true })
  displayName: string;
}
