import express, { request, response } from 'express';

import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController';


const routes = express.Router();
// index, show, create, update, delete
const itemsController = new ItemsController();
const pointsController = new PointsController();

// get - Buscar informação
// post - Criar informação

routes.get('/items', itemsController.index);    // index - Para Listagem; show - para mostar apenas um registro

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show)

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/