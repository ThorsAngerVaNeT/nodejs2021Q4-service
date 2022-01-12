import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeOnDeleteForTaskColumnId1642014050596 implements MigrationInterface {
    name = 'ChangeOnDeleteForTaskColumnId1642014050596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Tasks" DROP CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387"`);
        await queryRunner.query(`ALTER TABLE "Tasks" ADD CONSTRAINT "FK_150fedd2a3f5f9a9ad2b4612387" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
