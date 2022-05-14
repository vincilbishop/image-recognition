import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseModelPrimaryCode } from "./common/base-model-primary-code";
import { ImageModificationInstance } from "./image-modification-instance";



@Entity()
export class ImageFile extends BaseModelPrimaryCode {

    @OneToOne(() => ImageModificationInstance)
    @JoinColumn({ name: 'original_image_modification' })
    originalModification: ImageModificationInstance
}
