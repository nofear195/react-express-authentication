const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Output JSON file
const endpointsFiles = ['src/routes/index.ts']; // Array of route files

const doc = {
  info: {
    title: 'Your API',
    description: 'Your API description',
    version: '1.0.0',
  },
  host: 'localhost:3000', // Set your server host and port
  basePath: '/api',
};

swaggerAutogen(outputFile, endpointsFiles, doc);
