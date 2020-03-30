
exports.up = function(knex) {
    return knex.schema.createTable('evento', function (table){
        table.increments();
        table.string('name').notNullable(); 
        table.string('description').notNullable(); 
        table.decimal('value').notNullable(); 
        
        table.string('organizador_id').notNullable(); 

        table.foreign('organizador_id').references('id').inTable('organizador');
     });
};

exports.down = function(knex) {
  return knex.schema.dropTable('evento');
};
