
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        
        //incremento de chave primeira automatica
        table.increments();
        
        //Campos da tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //Criando o relacionamento com a nossa chave primaria que e uma string "id"
        table.string('ongsId').notNullable();

        //Criando a chave estrangeira
        table.foreign('ongsId').references('id').inTable('ongs');

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
