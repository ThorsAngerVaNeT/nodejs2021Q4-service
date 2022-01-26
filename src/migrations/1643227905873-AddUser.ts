import bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import config from '../config/config';

export class AddUser1643227905873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hash = await bcrypt.hash('admin', config.SALT_ROUNDS);
    await queryRunner.query(
      `INSERT INTO "Users" (name, login, password) VALUES ('admin','admin','${hash}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Users" WHERE login='admin'`);
  }
}
