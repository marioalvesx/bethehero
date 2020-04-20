exports.up = function(knex) {   // Método UP: Responsável pela criação da tabela.
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function(knex) { // Método DOWN: Deletar tabelas, voltar atrás na criação;
    return knex.schema.dropTable('ongs');
};
