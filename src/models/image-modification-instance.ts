import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModelPrimaryId } from "./common/base-model-primary-id";
import { ImageFile } from "./image-file";
import { ImageModificationInstanceLabel } from "./image-modification-instance-label";
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

    @OneToMany(() => ImageModificationInstanceLabel, (label) => label.modification)
    labels: ImageModificationInstanceLabel[]
}
