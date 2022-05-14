import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModelPrimaryId } from "./common/base-model-primary-id";
import { ImageFile } from "./image-file";
import { ImageModificationInstanceLabel } from "./image-modification-instance-label";
import { ImageModificationInstanceObject } from "./image-modification-instance-object";
import { ImageOperation } from "./image-operation";


@Entity()
export class ImageModificationInstance extends BaseModelPrimaryId {
    @ManyToOne((type) => ImageOperation, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_operation_1' })
    imageOp1: ImageOperation;

    @ManyToOne((type) => ImageOperation, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_operation_2' })
    imageOp2: ImageOperation;

    @ManyToOne((type) => ImageFile, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'original_image_file' })
    originalImageFile: ImageFile;

    @Column({ name: 'subject_image_file_name' })
    subjectImageFileName: string;

    @Column({ name: 'modification_description' })
    modificationDescription: string;

    @Column({ name: 'detected_total_count', nullable: true })
    detectedTotalCount: number;

    @Column({ name: 'detected_label_count', nullable: true })
    detectedLabelCount: number;

    @Column({ name: 'detected_object_count', nullable: true })
    detectedObjectCount: number;

    @Column({ name: 'average_object_score', nullable: true, type: 'decimal' })
    averageObjectScore: number;

    @Column({ name: 'stdv_object_score', nullable: true, type: 'decimal' })
    stdvObjectScore: number;

    @Column({ name: 'average_label_score', nullable: true, type: 'decimal' })
    averageLabelScore: number;

    @Column({ name: 'stdv_label_score', nullable: true, type: 'decimal' })
    stdvLabelScore: number;

    @Column({ name: 'average_detected_score', nullable: true, type: 'decimal' })
    averageDetectedScore: number;

    @Column({ name: 'stdv_detected_score', nullable: true, type: 'decimal' })
    stdvDetectedScore: number;

    @OneToMany(() => ImageModificationInstanceLabel, (label) => label.modification)
    labels: ImageModificationInstanceLabel[]

    @OneToMany(() => ImageModificationInstanceObject, (object) => object.modification)
    objects: ImageModificationInstanceObject[]

    get subjectImageFilePath() {
        return `${__dirname}/../images/combined/${this.subjectImageFileName}`;
    }
}
