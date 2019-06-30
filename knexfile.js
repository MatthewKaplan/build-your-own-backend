module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost:/pro_teams"
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};
