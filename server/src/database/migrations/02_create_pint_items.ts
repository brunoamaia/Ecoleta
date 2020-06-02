import Knex from 'knex';

export async function up(knex: Knex) {  // forma de utilizar o Typescript para ajudar
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();   // coluna de identificação e com autoincremento

        table.integer('point_id').notNullable()
        .references('id').inTable('points');    // Chave estrangeira (precisa ser um ID válido da tabela points)

        table.integer('item_id').notNullable()
        .references('id').inTable('items');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items')
}