import { getRepository, Repository } from "typeorm";
import { User } from "../entities";

export class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  public async getListOfUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
