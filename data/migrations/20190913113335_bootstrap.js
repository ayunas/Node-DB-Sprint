
exports.up = function(knex) {
  return knex.schema
  .createTable('Projects', tbl => {
      tbl.increments();
      tbl.string('project_name',128).notNullable().unique();
      tbl.boolean('completed').defaultTo(false);
      tbl.string('project_description', 255).defaultTo('this is a new task');
  })
  .createTable('Resources', tbl => {
      tbl.increments();
      tbl.string('resource_name', 128).notNullable().unique();
      tbl.string('resource_description', 512);
  })
  .createTable('Tasks', tbl => {
      tbl.increments();
      tbl.integer('project_id').unsigned().notNullable().references('id').inTable('Projects');
      tbl.string('task_description',512).notNullable();
      tbl.string('task_notes', 512);
      tbl.boolean('completed').defaultTo(false);
  })
  .createTable('PR_Manager', tbl => {
      tbl.increments();
      tbl.integer('project_id').unsigned().notNullable().references('id').inTable('Projects');
      tbl.integer('resource_id').unsigned().notNullable().references('id').inTable('Resources');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('PR_Manager')
  .dropTableIfExists('Tasks')
  .dropTableIfExists('Resources')
  .dropTableIfExists('Projects')
};
