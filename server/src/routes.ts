import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {   // Consultar itens
    const items = await knex('items').select('*');    // Seleciona todos os elelementos da tabela "itens"

    const serializedItems = items.map( item => { // Percorre todos os itens e permite modificá-los
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });      
    return response.json(serializedItems);
});

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/