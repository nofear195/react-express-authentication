import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { exit } from 'process';
import routes from '../routes';
import sequelize, { hasDatabaseConfig } from '../services/database';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../../swagger-output.json';
import { authenticateToken } from '../utils/authenticate';
import { handleAndConvertError } from '../utils/helper';

if (sequelize) {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log('Database synchronized');
    })
    .catch((error) => {
      handleAndConvertError(error);
      console.warn('[database] Failed to synchronize. Continuing without a database connection.');
    });
} else if (!hasDatabaseConfig) {
  console.warn('[database] Running without a configured database. API endpoints may be limited.');
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve Swagger UI at /swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Apply the authentication middleware to all routes
// app.use(authenticateToken);

// API routes
app.use('/api', routes);

export default app;
