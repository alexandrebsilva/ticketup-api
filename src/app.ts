// this shim is required
import { Action, createExpressServer } from "routing-controllers";
import { UserController } from "./controllers";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    // demo code:
    const token = action.request.headers["authorization"];
    if (roles.includes("POST_MODERATOR") || roles.includes("qualquer")) {
      return true;
    } else {
      return false;
    }
  },
  controllers: [UserController], // we specify controllers we want to use
});

app.use(helmet());
app.use(cors());
app.use(express.json());

export { app };
