import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { exit } from 'process';
import routes from '../routes';
import sequelize from '../services/database';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../../swagger-output.json';
import { authenticateToken } from '../utils/authenticate';
import { handleAndConvertError } from '../utils/helper';

// Initialize Sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    handleAndConvertError(error);
    exit(1);
  });

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
