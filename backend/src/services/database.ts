import { Sequelize } from "sequelize-typescript";
import path from 'path';
import config from "../utils/config";

const sequelize = new Sequelize({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    dialect: 'mysql',
    database: config.MYSQL_DATABASE,
    username: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    models: [path.join(__dirname, '../models/*.ts')],
})

export default sequelize;