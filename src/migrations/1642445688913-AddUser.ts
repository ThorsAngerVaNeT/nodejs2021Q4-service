import bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { SALT_ROUNDS } from '../common/config';

export class AddUser1642445688913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hash = await bcrypt.hash('admin', SALT_ROUNDS);
    await queryRunner.query(
      `INSERT INTO "Users" (name, login, password) VALUES ('admin','admin','${hash}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Users" WHERE login='admin'`);
  }
}
