
exports.up = function(knex, Promise) {
  return knex.schema 
  .createTable('projects', table => {
      table.increments(); 

      table.string('project_name', 128) 
      .notNullable(); 

      table.string('project_description')
      .notNullable(); 

      table.boolean('completed')
      .toDefault(false); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema 
  .dropTableIfExists('projects')
};
