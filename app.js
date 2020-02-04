const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const app = express();

app.use(auth);
const {graphiqlResolvers} = require('./graphql/resolvers/index');
const graphiqlSchemas = require('./graphql/schemas');
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphiqlSchemas,
    rootValue: graphiqlResolvers,
    graphiql: true,
  }),
);

app.get('/', (req, res, next) => {
  res.send('hello world');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphql-demo-wyowx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3002);
  })
  .catch((err) => {
    console.log(err);
  });
