import { randomUUID } from 'crypto';

import { IUserRepository, FindOneOptions, UpdateOptions } from '../repositories/userRepository.types';
import usersSeed from './data/users.json';

type MockUserRecord = {
  id: number;
  name: string | null;
  picture: string | null;
  email: string;
  password: string;
  isVerified: boolean;
  verificationString: string;
  createdAt: Date;
  updatedAt: Date;
};

const mockUsers: MockUserRecord[] = usersSeed.map((user) => ({
  ...user,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
}));

let idCounter = mockUsers.reduce((max, user) => Math.max(max, user.id), 0) + 1;

const matchesWhere = (user: MockUserRecord, where: FindOneOptions['where'] = {}) => {
  if (where.id !== undefined && user.id !== where.id) return false;
  if (where.email !== undefined && user.email !== where.email) return false;
  if (where.verificationString !== undefined && user.verificationString !== where.verificationString)
    return false;
  return true;
};

const clone = (user: MockUserRecord) => ({ ...user });

const mapAttributes = (user: MockUserRecord, attributes?: string[]) => {
  if (!attributes || attributes.length === 0) return clone(user);
  const result: Record<string, any> = {};
  attributes.forEach((attr) => {
    if (attr === 'is_verified') {
      result[attr] = user.isVerified;
    } else {
      result[attr] = (user as any)[attr];
    }
  });
  return result;
};

const mockUserRepository: IUserRepository = {
  async findAll() {
    return mockUsers.map((user) => clone(user));
  },
  async findOne(options: FindOneOptions) {
    const user = mockUsers.find((record) => matchesWhere(record, options?.where));
    if (!user) return null;
    return mapAttributes(user, options?.attributes);
  },
  async create(data: Record<string, any>) {
    const now = new Date();
    const newUser: MockUserRecord = {
      id: idCounter++,
      name: data.name ?? null,
      picture: data.picture ?? null,
      email: data.email,
      password: data.password,
      isVerified: Boolean(data.isVerified ?? false),
      verificationString: data.verificationString ?? randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    mockUsers.push(newUser);
    return clone(newUser);
  },
  async update(values: Record<string, any>, options: UpdateOptions) {
    const user = mockUsers.find((record) => matchesWhere(record, options?.where));
    if (!user) return [0, null];
    Object.assign(user, values);
    user.updatedAt = new Date();
    return [1, null];
  },
};

export default mockUserRepository;
