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

    const trx = await knex.transaction();       // Garante que toda a operaçõa será executada, ou caso alguma falhe, cancele

    const insertedIds = await trx('points').insert({   // short sintaxe (quando o nome da variável é igual da prpopriedade do objeto)
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];

    const pointItems = items.map( (item_id: number) => {    // relaciona o ponto com os elementos que ele vai coletar
        return {
            item_id,
            point_id: point_id,
        }
    });

    await trx('point_items').insert(pointItems);

    return response.json({ success: true});
});

export default routes;  // Precisa exportar, para que seja importada

/*
routes.get('/', (request, response) => {   // Home
    return response.json({ message: 'Hello World' });
});
*/