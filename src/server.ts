import Express from "express";
import { resolvers, schema } from "./schema";
import Envs from "./envs";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import Logger from "./logger";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = Express();
  const port = Envs.port;
  const httpServer = http.createServer(app);

  app.use(Express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: (params) => () => {
      const checkHaveError =
        params.req.body["operationName"] !== "IntrospectionQuery" ||
        !params.req.body["query"].includes("IntrospectionQuery");
      if (checkHaveError) {
        Logger.info({
          query: params.req.body.query,
          variables: params.req.body.variables,
        });
      } else {
        Logger.error({
          query: params.req.body.query,
          variables: params.req.body.variables,
        });
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `Server is running at http://localhost:${Envs.port}${Envs.graphqlPath}`
  );
}

startApolloServer(schema, resolvers);
