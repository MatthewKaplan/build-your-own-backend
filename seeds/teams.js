const locations = require("../data/locations.json");
const teams = require("../data/teams.json");

const createLocation = (knex, location) => {
  return knex("locations")
    .insert(
      {
        city: location.city,
        state: location.state,
        location: location.location
      },
      "id"
    )
    .then(teamID => {
      let teamPromises = [];
      teams.teams
        .filter(team => team.location === location.location)
        .forEach(team => {
          teamPromises.push(createTeam(knex, team, teamID));
        });

      return Promise.all(teamPromises);
    });
};

const createTeam = (knex, team, teamID) => {
  return knex("teams").insert({
    team_name: team.team_name,
    city: team.city,
    venue: team.venue,
    state: team.state,
    league: team.league
  });
};

exports.seed = function(knex) {
  return knex("teams")
    .del()
    .then(() => knex("locations").del())
    .then(() => knex.raw("TRUNCATE TABLE locations RESTART IDENTITY CASCADE"))
    .then(() => knex.raw("TRUNCATE TABLE teams RESTART IDENTITY CASCADE"))
    .then(() => {
      let locationPromises = [];

      locations.locations.forEach(location => {
        locationPromises.push(createLocation(knex, location));
      });

      return Promise.all(locationPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
