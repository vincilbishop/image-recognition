import { Column, Entity } from "typeorm";
import { BaseModelPrimaryCode } from "./common/base-model-primary-code";


@Entity()
export class ImageOperation extends BaseModelPrimaryCode {
    @Column({ name: 'operation_name' })
    operationName: string;

    @Column({ name: 'operation_value' })
    operationValue: number;
}
