import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUser1727712257562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "user"
          ADD "username" VARCHAR NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "user"
          DROP COLUMN "username"
        `);
  }
}
