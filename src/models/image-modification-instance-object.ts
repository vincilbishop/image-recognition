import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModelPrimaryId } from "./common/base-model-primary-id";
import { ImageModificationInstance } from "./image-modification-instance";


@Entity()
export class ImageModificationInstanceObject extends BaseModelPrimaryId {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'mid' })
    mid: string;

    @Column({ name: 'score', type: 'decimal' })
    score: number;

    @ManyToOne(() => ImageModificationInstance, (mod) => mod.objects)
    @JoinColumn({ name: 'image_modification' })
    modification: ImageModificationInstance
}
