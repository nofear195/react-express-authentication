import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { envConfig } from '../utils/config';

const hasDatabaseConfig = Boolean(
  envConfig.DB_HOST &&
    envConfig.DB_PORT &&
    envConfig.DB_DATABASE &&
    envConfig.DB_USER &&
    envConfig.DB_PASSWORD,
);

if (!hasDatabaseConfig) {
  console.warn('[database] Missing DB configuration; skipping Sequelize initialization.');
}

const sequelize = hasDatabaseConfig
  ? new Sequelize({
      host: envConfig.DB_HOST,
      port: envConfig.DB_PORT,
      dialect: 'mysql',
      database: envConfig.DB_DATABASE,
      username: envConfig.DB_USER,
      password: envConfig.DB_PASSWORD,
      models: [path.join(__dirname, '../models/*.ts')],
    })
  : null;

export { hasDatabaseConfig };
export default sequelize;
