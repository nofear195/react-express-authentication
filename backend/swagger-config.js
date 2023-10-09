const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger-output.json'; // Output JSON file
const endpointsFiles = ['src/routes/index.ts']; // Array of route files

const doc = {
  info: {
    title: 'Backend API',
    description: 'Backend API',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'User',
      description: 'user api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
