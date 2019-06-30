const express = require("express");
const dbConnection = require("./connection");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));

app.get("/api/v1/teams", (req, res) => {
  dbConnection("teams")
    .select("*")
    .then(teams => res.status(200).json(teams))
    .catch(error =>
      res.status(500).json({ error: error.message, stack: error.stack })
    );
});

app.get("/api/v1/locations", (req, res) => {
  dbConnection("locations")
    .select("*")
    .then(locations => res.status(200).json(locations))
    .catch(error =>
      res.status(500).json({ error: error.message, stack: error.stack })
    );
});

app.get("/api/v1/teams/:id", (req, res) => {
  dbConnection("teams")
    .select("*")
    .limit(1)
    .where({ id: req.params.id })
    .then(team => res.status(200).json(team))
    .catch(error =>
      res.status(500).json({ error: error.message, stack: error.stack })
    );
});

app.get("/api/v1/locations/:id", (req, res) => {
  dbConnection("locations")
    .select("*")
    .limit(1)
    .where({ id: req.params.id })
    .then(team => res.status(200).json(team))
    .catch(error =>
      res.status(500).json({ error: error.message, stack: error.stack })
    );
});

app.post('/api/v1/teams', (req, res) => {
  const newTeam = req.body;
  const requiredParameters = ['team_name', 'city', 'venue', 'state', 'league', 'location']
  
  for (let requiredParameter of requiredParameters) {
    if (!team[requiredParameter]) {
      return res.status(422)
        .json({ error: `Team was not added, please make sure you include a ${requiredParameter}` })
    }
  }

  database('locations').where({ location: newTeam.location }).select('id')
    .then(locationId => {
      if (!locationId) {
        res.status(404)
          .json({ error: `No location found with the name ${newTeam.location}. Please choose an existing location, or create a new location.` })
      } else {
        database('teams').insert({ ...newTeam, location_id: locationId }, 'id')
          .then(newId => {
            res.status(201).json({ newId });
          })
          .catch(error => {
            res.status(500).json({ error });
          });
      }
    });
});

app.delete("/api/v1/teams/:id", (req, res) => {
  const { id } = req.params;
  database("teams")
    .where({ id })
    .del()
    .then(result => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: `No teams found with the id of ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

// knex('users')
//   .where({ email: 'hi@example.com' })
//   .then(rows => ···)

app.listen(PORT, () => console.log(`Example app running!`));
