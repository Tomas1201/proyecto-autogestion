import { Op } from "sequelize";
import { SequelizeDB } from "../../database/sequelize.js";
import {User} from '../../shared/models/users.model.js';

export class AuthRepository{
      static instance: AuthRepository;
  static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }
  constructor() {}

  //async findUser(email: string, password_hash: string): Promise<User | null>{
//
  //}

}