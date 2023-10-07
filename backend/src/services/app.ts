import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import sequelize from '../services/database';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../../swagger-output.json';
import { authenticateToken } from './authenticate';

// Initialize Sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve Swagger UI at /api-docs
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Apply the authentication middleware to all routes
app.use(authenticateToken);

app.use('/api', routes); // API routes

export default app;
