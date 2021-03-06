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
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log('REQUEST START');
        requestContext.response.http.headers.set('Has-Errors', '1');
      }
    }
  ]
});

exports.handler = server.createHandler();
