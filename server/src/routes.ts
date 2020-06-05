import express, { request, response } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController';


const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

// get - Buscar informação
// post - Criar informação
// *** index, show, create, update, delete
routes.get('/items', itemsController.index);    // index - Para Listagem; show - para mostar apenas um registro

routes.post('/points', upload.single('image'), pointsController.create);    // Cira o ponto de Coleta e vai poder fazer upload d imagem
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/