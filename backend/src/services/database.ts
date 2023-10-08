import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import config from '../utils/config';

const sequelize = new Sequelize({
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: 'mysql', // mysql (default), postgres, sqlite, mariadb and mssql
  database: config.DB_DATABASE,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  models: [path.join(__dirname, '../models/*.ts')],
});

export default sequelize;
