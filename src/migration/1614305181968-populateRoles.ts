import { MigrationInterface, QueryRunner } from "typeorm";

export class populateRoles1614305181968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO roles
        (id,name, description)
        VALUES(1,'tenant', 'User based in the property'), (2,'admin', 'Responsible User for the real state administration'), (3,'client', 'User who has hired the real state as a service provider');
        `);

    await queryRunner.query(`INSERT INTO severities
        (id,name, description)
        VALUES(1,'unknown', 'Unknown, still need to collect some more information'), (2,'low', 'Not quite important -  It can wait for action'), (3,'medium', 'Ordinay ticket')
        (4,'high', 'It requires almost 100% of attention on the ticket'), (5,'critical', 'Extremely urgent')
        ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id in (1,2,3)`);
    await queryRunner.query(`DELETE FROM severities WHERE id in (1,2,3,4,5)`);
  }
}
