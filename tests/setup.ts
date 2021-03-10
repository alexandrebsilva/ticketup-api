import { createConnection } from "typeorm";

beforeAll(async () => {
  await createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ticketup-db",
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    migrationsTableName: "custom_migration_table",
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  });
});

afterAll(async () => {
  jest.resetModules();
});
