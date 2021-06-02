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
    const rawToken = action.request.headers["authorization"];

    if (rawToken) {
      const [_bearerString, token] = rawToken.split("Bearer ");
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

  controllers: [
    UserController,
    AuthController,
    TicketController,
    PropertyController,
  ],
});

export { app };
