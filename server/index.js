const express = require("express");
require("dotenv").config();
// require('dotenv').config({path: './server/.env'})
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema"); //Uses the Schema file under "server" folder

const port = process.env.PORT || 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", //Trigger only if .env is set as "development"
  })
);

//To Access GraphQL Query:
//localhost:<PORT>/graphql


app.listen(port, console.log(`Server running on port ${port}`));
