import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1651942239858 implements MigrationInterface {
    name = 'InitialMigration1651942239858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image_file" ("meta_data" text, "tag" character varying(256), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "code" character varying(256) NOT NULL, "display_name" character varying, CONSTRAINT "UQ_7df698833cb5c6d1c986a130f09" UNIQUE ("code"), CONSTRAINT "UQ_98b922ae215a817686265e1d4d2" UNIQUE ("display_name"), CONSTRAINT "PK_7df698833cb5c6d1c986a130f09" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "image_modification_instance_label" ("meta_data" text, "tag" character varying(256), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "id" SERIAL NOT NULL, "description" character varying NOT NULL, "mid" character varying NOT NULL, "score" numeric NOT NULL, "topicality" numeric NOT NULL, "image_modification" integer, CONSTRAINT "PK_b5373b8a397c0f9386e55609365" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_operation" ("meta_data" text, "tag" character varying(256), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "code" character varying(256) NOT NULL, "display_name" character varying, "operation_name" character varying NOT NULL, "operation_value" integer NOT NULL, CONSTRAINT "UQ_a257bee604afa5b037f1a842e1e" UNIQUE ("code"), CONSTRAINT "UQ_73f5524c463871368d7d34217c9" UNIQUE ("display_name"), CONSTRAINT "PK_a257bee604afa5b037f1a842e1e" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "image_modification_instance" ("meta_data" text, "tag" character varying(256), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "id" SERIAL NOT NULL, "subject_image_file_name" character varying NOT NULL, "modification_description" character varying NOT NULL, "image_operation_1" character varying(256), "image_operation_2" character varying(256), "original_image_file" character varying(256), CONSTRAINT "PK_3730b1eb1df69a48c5d9c30ab99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance_label" ADD CONSTRAINT "FK_f1ae4031269d95041d9e81a2f64" FOREIGN KEY ("image_modification") REFERENCES "image_modification_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance" ADD CONSTRAINT "FK_8ec23ee7797a009ecc9bc6836d2" FOREIGN KEY ("image_operation_1") REFERENCES "image_operation"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance" ADD CONSTRAINT "FK_12ebbdf84571100032c9bdea939" FOREIGN KEY ("image_operation_2") REFERENCES "image_operation"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance" ADD CONSTRAINT "FK_1ec4904de4a9a12acc25da9e2a8" FOREIGN KEY ("original_image_file") REFERENCES "image_file"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image_modification_instance" DROP CONSTRAINT "FK_1ec4904de4a9a12acc25da9e2a8"`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance" DROP CONSTRAINT "FK_12ebbdf84571100032c9bdea939"`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance" DROP CONSTRAINT "FK_8ec23ee7797a009ecc9bc6836d2"`);
        await queryRunner.query(`ALTER TABLE "image_modification_instance_label" DROP CONSTRAINT "FK_f1ae4031269d95041d9e81a2f64"`);
        await queryRunner.query(`DROP TABLE "image_modification_instance"`);
        await queryRunner.query(`DROP TABLE "image_operation"`);
        await queryRunner.query(`DROP TABLE "image_modification_instance_label"`);
        await queryRunner.query(`DROP TABLE "image_file"`);
    }

}
