import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1727711745555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "email" VARCHAR NOT NULL
          )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
