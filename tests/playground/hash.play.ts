import { encrypt } from "../../src/helpers/bcrypt";

describe("Example test", () => {
  it("PLAY Create a hash ", (done) => {
    const hash = encrypt("teste");
    console.log(hash);
    done();
  });
});
