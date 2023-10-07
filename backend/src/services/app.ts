import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';
import sequelize from '../services/database';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../../swagger-output.json';

const app = express();

// Initialize Sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes); // User routes

// Serve Swagger UI at /api-docs
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

export default app;
