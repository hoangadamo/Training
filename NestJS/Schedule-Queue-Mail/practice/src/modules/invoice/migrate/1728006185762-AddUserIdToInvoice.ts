import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToInvoice1728006185762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add userId column to invoices table
    await queryRunner.query('ALTER TABLE invoices ADD COLUMN userId int');

    // Add foreign key constraint
    await queryRunner.query(
      'ALTER TABLE invoices ADD CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES users(id)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraint
    await queryRunner.query('ALTER TABLE invoices DROP CONSTRAINT FK_user');

    // Remove userId column from invoices table
    await queryRunner.query('ALTER TABLE invoices DROP COLUMN userId');
  }
}
