import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import UserAPI from "./userAPI.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  context: async () => {
    return {
      dataSources: {
        userAPI: new UserAPI(),
      },
    };
  },
});

console.log(`Server ready at ${url}`);
