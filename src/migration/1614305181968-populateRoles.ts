import { MigrationInterface, QueryRunner } from "typeorm";

export class populateRoles1614305181968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO roles
        (id,name, description)
        VALUES(1,'tenant', 'User based in the property'), (2,'admin', 'Responsible User for the real state administration'), (3,'client', 'User who has hired the real state as a service provider');
        `);

    await queryRunner.query(`INSERT INTO severities
        (id,name, description)
        VALUES(1,'unknown', 'Unknown, still need to collect some more information'), (2,'low', 'Not quite important -  It can wait for action'), (3,'medium', 'Ordinay ticket'),(4,'high', 'It requires almost 100% of attention on the ticket'), (5,'critical', 'Extremely urgent');
        `);

    await queryRunner.query(`INSERT INTO public.users (id,"firstName","lastName",birthdate,email,cpf,"dddPhone",phone,"password","roleId")
      VALUES (1,'Alexandre','Borges','1995-05-12','ale@ale.com','40887268803','11','982823015','$2b$10$AjGmsDtmmgPvDI5gTL6dU.nIrIn4aF7qF9tbJSMO5cx6NXTUbt8tu',1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id in (1,2,3)`);
    await queryRunner.query(`DELETE FROM severities WHERE id in (1,2,3,4,5)`);
    await queryRunner.query(`DELETE FROM users WHERE id in (1)`);
  }
}
