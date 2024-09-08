// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Documentação da API de Usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/index.js'],
});

const swaggerDocs = {
  swaggerUi: swaggerUi.serve,
  swaggerUiSetup: swaggerUi.setup(swaggerSpec),
};

module.exports = swaggerDocs;
