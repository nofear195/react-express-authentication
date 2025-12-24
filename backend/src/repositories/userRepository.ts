import { User } from '../models/User';
import { hasDatabaseConfig } from '../services/database';
import mockUserRepository from '../mocks/mockUserRepository';
import { IUserRepository } from './userRepository.types';

const sequelizeRepository: IUserRepository = {
  findAll: () => User.findAll(),
  findOne: (options) => User.findOne(options as any),
  create: (data) => User.create(data as User),
  update: (values, options) => User.update(values, options as any),
};

const userRepository: IUserRepository = hasDatabaseConfig ? sequelizeRepository : mockUserRepository;

export default userRepository;
