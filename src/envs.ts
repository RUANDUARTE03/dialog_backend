const { config } = require("dotenv");

config();

const envs = {
  port: process.env.PORT || 4000,
  graphqlPath: process.env.GRAPHQL_PATH || "/graphql",
};

export default envs;
