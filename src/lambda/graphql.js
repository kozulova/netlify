// src/lambda/graphql.js
const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      return "Hello, world!";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({res}) => {
    res.header('key', 'value')
  }
});

exports.handler = server.createHandler();
