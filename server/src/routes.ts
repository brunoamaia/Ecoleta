import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});

export default routes;  // Precisa exportar, para que seja importada