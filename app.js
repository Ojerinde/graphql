const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

const app = express();

// graphql only has one url: here we will see the grapiql UI
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // graphiql: an interface to test our api more like Postman
    graphiql: true,
  })
);

module.exports = app;
