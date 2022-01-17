import bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

const saltRounds = 10;
const hash = bcrypt.hashSync('admin', saltRounds);

export class AddUser1642445688913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "Users" (name, login, password) VALUES ('admin','admin','${hash}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Users" WHERE login='admin'`);
  }
}
