import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialCreateTables1642010555888 implements MigrationInterface {
    name = 'InitialCreateTables1642010555888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c6e5f70d152837a96b578a5a14" ON "Columns" ("boardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca17d7904535e3448bf3634a2b" ON "Tasks" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ecd45e48ba58dc52caef3c0e5d" ON "Tasks" ("boardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_150fedd2a3f5f9a9ad2b461238" ON "Tasks" ("columnId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_150fedd2a3f5f9a9ad2b461238"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ecd45e48ba58dc52caef3c0e5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca17d7904535e3448bf3634a2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6e5f70d152837a96b578a5a14"`);
    }

}
