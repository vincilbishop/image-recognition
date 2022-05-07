import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModelPrimaryId } from "./common/base-model-primary-id";
import { ImageModificationInstance } from "./image-modification-instance";


@Entity()
export class ImageModificationInstanceLabel extends BaseModelPrimaryId {
    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'mid' })
    mid: string;

    @Column({ name: 'score', type: 'decimal' })
    score: number;

    @Column({ name: 'topicality', type: 'decimal' })
    topicality: number;

    @ManyToOne(() => ImageModificationInstance, (mod) => mod.labels)
    @JoinColumn({ name: 'image_modification' })
    modification: ImageModificationInstance
}
