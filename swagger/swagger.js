const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blagues',
      version: '1.0.0',
      description: 'Une API pour gérer les blagues',
    },
  },
  apis: ['./routes/blaguesRoutes.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
