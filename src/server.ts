import { app } from "./app";

//TYPEORM
import { createConnection } from "typeorm";

async function start() {
  app.listen(3000, () => {
    console.log("listening to port 3000");
  });
  const connection = await createConnection();
}

start();
