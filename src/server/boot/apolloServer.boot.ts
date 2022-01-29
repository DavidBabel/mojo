import { ApolloServer } from "apollo-server-express";
import { CONFIG } from "~/iso/config";
import { graphqlUploadExpress } from "graphql-upload";
import { Express } from "express";

import { schema } from "~/server/graphql/buildSchema";
import { Mo } from "~/iso/number";

const apolloServer = new ApolloServer({
  // context,
  schema,
  logger: console,
  formatError: error => {
    console.log(JSON.stringify(error.message, null, 2));
    return error;
  },
});

export async function startApolloServer(expressServer: Express) {
  expressServer.use(
    graphqlUploadExpress({ maxFileSize: 10 * Mo, maxFiles: 10 }),
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: expressServer,
    path: CONFIG.GRAPHQL_ENDPOINT,
  });
}
