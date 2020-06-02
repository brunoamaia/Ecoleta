import {Request, Response} from 'express';
import Knex from '../database/connection';

class PointsController {
    async create(request: Request, response: Response) {
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
    
        const trx = await Knex.transaction();       // Garante que toda a operaçõa será executada, ou caso alguma falhe, cancele

        const point = {   // short sintaxe (quando o nome da variável é igual da prpopriedade do objeto)
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map( (item_id: number) => {    // relaciona o ponto com os elementos que ele vai coletar
            return {
                item_id,
                point_id: point_id,
            }
        });
    
        await trx('point_items').insert(pointItems);
    
        return response.json({
            id: point_id,
            ... point,  //passa todos os valores do elemento
        });
    }
}


export default PointsController;