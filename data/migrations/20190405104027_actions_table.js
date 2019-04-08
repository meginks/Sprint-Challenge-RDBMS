
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('actions', table => {
        table.increments(); 
  
        table.string('action_description') 
        .notNullable(); 
  
        table.string('action_notes')
        .notNullable(); 
  
        table.boolean('completed')
        .toDefault(false); 

        table.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
    })
};

exports.down = function(knex, Promise) {
  return knex.schema 
  .dropTableIfExists('actions');
};
