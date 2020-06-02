import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

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

routes.post('/points', async (request, response) => {
    const {     // desestruturação do item   (const name = request.body.name)
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } =  request.body;

    await knex('points').insert({   // short sintaxe (quando o nome da variável é igual da prpopriedade do objeto)
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    return response.json({ success: true});
});

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/