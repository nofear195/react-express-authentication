export type UserWhereInput = {
  id?: number;
  email?: string;
  verificationString?: string;
};

export type FindOneOptions = {
  where: UserWhereInput;
  attributes?: string[];
};

export type UpdateOptions = {
  where: UserWhereInput;
};

export interface IUserRepository {
  findAll(): Promise<any[]>;
  findOne(options: FindOneOptions): Promise<any | null>;
  create(data: Record<string, any>): Promise<any>;
  update(values: Record<string, any>, options: UpdateOptions): Promise<[number, any?]>;
}
