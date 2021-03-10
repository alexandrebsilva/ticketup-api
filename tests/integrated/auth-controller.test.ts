import request from "supertest";
import { app } from "../../src/app";

describe("Auth tests", () => {
  beforeAll(async () => {
    const result = await app.get("/user");
  });

  it("Should authenticate the user", async (done) => {
    const result = await request(app)
      .post("/user/login")
      .send({ email: "ale@ale.com", password: "teste" });

    done();
  });
});
