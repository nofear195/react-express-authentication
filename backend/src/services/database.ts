import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { envConfig } from '../utils/config';

const sanitizeValue = (value: unknown) => {
  if (typeof value === 'string') return value.trim();
  return value;
};

const isPlaceholder = (value: unknown) =>
  typeof value === 'string' && value.trim().toLowerCase() === 'db host';

const host = sanitizeValue(envConfig.DB_HOST);
const port = envConfig.DB_PORT;
const database = sanitizeValue(envConfig.DB_DATABASE);
const username = sanitizeValue(envConfig.DB_USER);
const password = sanitizeValue(envConfig.DB_PASSWORD);

const hasDatabaseConfig = Boolean(
  host &&
    !isPlaceholder(host) &&
    port &&
    database &&
    username &&
    password,
);

if (!hasDatabaseConfig) {
  console.warn('[database] Missing DB configuration; skipping Sequelize initialization.');
}

const sequelize = hasDatabaseConfig
  ? new Sequelize({
      host: host as string,
      port,
      dialect: 'mysql',
      database: database as string,
      username: username as string,
      password: password as string,
      models: [path.join(__dirname, '../models/*.ts')],
    })
  : null;

export { hasDatabaseConfig };
export default sequelize;
