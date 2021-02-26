import { MigrationInterface, QueryRunner } from "typeorm";

export class populateRoles1614305181968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO roles
        (id,name, description)
        VALUES(1,'tenant', 'User based in the property'), (2,'admin', 'Responsible User for the real state administration'), (3,'client', 'User who has hired the real state as a service provider');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id in (1,2,3)`);
  }
}
