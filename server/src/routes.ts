import express, { request, response } from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {   // Consultar itens
    const items = await knex('items').select('*');    // Seleciona todos os elelementos da tabela "itens"

    const serializedItems = items.map( item => { // Percorre todos os itens e permite modificá-los
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });      
    return response.json(serializedItems);
});

routes.post('/points', pointsController.create);

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/