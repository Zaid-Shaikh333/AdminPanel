const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 5000;
const colors = require('colors');
const { graphqlHTTP } = require("express-graphql");
const connect = require('./config/db')

const schema = require('./schema/schema')
const app = express();

connect();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}))
app.listen(port, console.log(`Server running on port ${port}`))