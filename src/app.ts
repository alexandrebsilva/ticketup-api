import "reflect-metadata";
import { Action, createExpressServer } from "routing-controllers";
import { UserController } from "./controllers";
import getJwtPayloadByToken from "./factories/jwt-payload-factory";

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["authorization"];
    if (token) {
      try {
        const jwtPayload = getJwtPayloadByToken(token);
        if (roles.includes(jwtPayload.role)) {
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
    return getJwtPayloadByToken(token);
  },

  // Here we specify controllers we want to use
  controllers: [UserController],
});

export { app };
