import { MigrationInterface, QueryRunner } from "typeorm";

export class populateRoles1614305181968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO roles
        (id,name, description)
        VALUES (1,'admin', 'Responsible User for the real state administration'),(2,'tenant', 'User based in the property'), (3,'client', 'User who has hired the real state as a service provider');
        `);

    await queryRunner.query(`INSERT INTO severities
        (id,name, description)
        VALUES(1,'unknown', 'Unknown, still need to collect some more information'), (2,'low', 'Not quite important -  It can wait for action'), (3,'medium', 'Ordinay ticket'),(4,'high', 'It requires almost 100% of attention on the ticket'), (5,'critical', 'Extremely urgent');
        `);

    await queryRunner.query(`INSERT INTO public.users (id,"firstName","lastName",birthdate,email,cpf,"dddPhone",phone,"password","roleId")
      VALUES (1,'Admin','Borges','1995-05-12','ale@ale.com','40887268803','11','982823015','$2b$10$AjGmsDtmmgPvDI5gTL6dU.nIrIn4aF7qF9tbJSMO5cx6NXTUbt8tu',1), 
      (2,'Tenant','Borges','1995-05-12','tenant@test.com','40887268802','11','982823016','$2b$10$AjGmsDtmmgPvDI5gTL6dU.nIrIn4aF7qF9tbJSMO5cx6NXTUbt8tu',2),
      (3,'Client','Borges','1995-05-12','client@test.com','40887268801','11','982823017','$2b$10$AjGmsDtmmgPvDI5gTL6dU.nIrIn4aF7qF9tbJSMO5cx6NXTUbt8tu',3);
    `);

    await queryRunner.query(`
    INSERT INTO public.property_types
      (id,"createdAt", "updatedAt", name, description)
      VALUES (1,now(), now(), 'house', 'single house'),
      (2,now(), now(), 'apartment', 'apartment'),
      (3,now(), now(), 'warehouse', 'warehouse');
    `);

    await queryRunner.query(`
    INSERT INTO public.ticket_status
    (id,"createdAt", "updatedAt", "name", description)
    VALUES (1,now(), now(), 'open', 'open'),
    (2,now(), now(), 'resolving', 'resolving'),
    (3,now(), now(), 'waiting', 'waiting for somebody or something to solve it'),
    (4,now(), now(), 'solved', 'solved'),
    (5,now(), now(), 'closed', 'closed');
    `);

    await queryRunner.query(`INSERT INTO public.properties
    (id,"createdAt", "updatedAt", uf, description, neighborhood, zipcode, address, "number", "userId", "propertyTypeId")
    VALUES(1,now(), now(), 'SP', 'casa simples', 'Bom Retiro', '01106090', 'Rua mathilde sa barbosa', '19', 3, 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM properties WHERE id in (1)`);
    await queryRunner.query(`DELETE FROM users WHERE id in (1,2,3)`);
    await queryRunner.query(`DELETE FROM roles WHERE id in (1,2,3)`);
    await queryRunner.query(`DELETE FROM severities WHERE id in (1,2,3,4,5)`);
    await queryRunner.query(`DELETE FROM property_types WHERE id in (1,2,3)`);
    await queryRunner.query(
      `DELETE FROM ticket_status WHERE id in (1,2,3,4,5)`
    );
  }
}
