import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import {envConfig} from '../utils/config';

const sequelize = new Sequelize({
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  dialect: 'mysql', // mysql (default), postgres, sqlite, mariadb and mssql
  database: envConfig.DB_DATABASE,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  models: [path.join(__dirname, '../models/*.ts')],
});

export default sequelize;
