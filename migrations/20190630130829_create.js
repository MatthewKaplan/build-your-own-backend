exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("locations", function(table) {
      table.increments("id").primary();
      table.string("city");
      table.string("state");
      table.string("location");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("teams", function(table) {
      table.increments("id").primary();
      table.string("team_name");
      table.string("city");
      table.string("venue");
      table.string("state");
      table.string("league");
      table.integer("location_id").unsigned();
      table.foreign("location_id").references("locations.id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("locations"),
    knex.schema.dropTable("teams")
  ]);
};
