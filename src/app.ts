import "reflect-metadata";
import { Action, createExpressServer } from "routing-controllers";
import {
  UserController,
  AuthController,
  TicketController,
} from "./controllers";
import { PropertyController } from "./controllers/property-controller";
import getJwtSignatureByToken from "./factories/jwt-payload-factory";

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["authorization"];
    if (token) {
      try {
        const JwtSignature = getJwtSignatureByToken(token);
        if (roles.includes(JwtSignature.role)) {
          return true;
        }
      } catch (err) {
        console.error(err.message);
        return false;
      }
    }
    return false;
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers["authorization"];
    return getJwtSignatureByToken(token);
  },

  // Here we specify controllers we want to use
  controllers: [
    UserController,
    AuthController,
    TicketController,
    PropertyController,
  ],
});

export { app };
