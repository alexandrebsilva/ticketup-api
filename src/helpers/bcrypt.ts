import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

function encrypt(text: string) {
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(text, salt);
}

function compareTextWithHash(text: string, hash: string): boolean {
  return bcrypt.compareSync(text, hash);
}

export { encrypt, compareTextWithHash };
