import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialCreateTables1641987759656 implements MigrationInterface {
    name = 'InitialCreateTables1641987759656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" smallint NOT NULL, "boardId" uuid, CONSTRAINT "PK_8d790543677f644f770ff91cb68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_5be7b56e2c14342b973e2569668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" smallint NOT NULL, "description" text NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Columns" ADD CONSTRAINT "FK_c6e5f70d152837a96b578a5a14b" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_ca17d7904535e3448bf3634a2ba" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_ecd45e48ba58dc52caef3c0e5dd" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_ecd45e48ba58dc52caef3c0e5dd"`);
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_ca17d7904535e3448bf3634a2ba"`);
        await queryRunner.query(`ALTER TABLE "Columns" DROP CONSTRAINT "FK_c6e5f70d152837a96b578a5a14b"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Boards"`);
        await queryRunner.query(`DROP TABLE "Columns"`);
    }

}
