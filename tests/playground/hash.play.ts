import * as bcrypt from "bcrypt";

describe("Example test", () => {
  it("Create a hash and compare with - SUCCESS", (done) => {
    const hash = bcrypt.hashSync("teste", 10);
    console.log(hash);
    expect(bcrypt.compareSync("teste", hash)).toBeTruthy();
    done();
  });

  it("Create a hash and compare with - ERROR", (done) => {
    const hash = bcrypt.hashSync("teste", 10);
    console.log(hash);
    expect(bcrypt.compareSync("ANOTHER STRING", hash)).toBeFalsy();
    done();
  });
});
