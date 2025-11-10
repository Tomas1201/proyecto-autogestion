import { Op } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";
import {User} from './users.model.js';

export class AuthRepository{
      static instance: AuthRepository;
  static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }
  constructor() {}

  async findUser(email: string): Promise<User | null>{
    return await User.findOne({
      where: {
        [Op.and]: [
          { email: email },
        ]
      }
    });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = await User.create(userData);
    return user;
  }

}