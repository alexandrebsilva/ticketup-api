//TYPEORM
import { Connection as typeOrmConnection, createConnection } from "typeorm";
import { app } from "../src/app";

export class ConnectionMock {
  private application: any;
  constructor() {
    app.listen(3000);
  }
}
