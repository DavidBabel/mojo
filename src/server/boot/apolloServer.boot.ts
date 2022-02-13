import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { graphqlUploadExpress } from "graphql-upload";

import { CONFIG } from "~/iso/config";
import { getCors } from "~/iso/cors";
import { Mb } from "~/iso/numbers/size";
import { schema } from "~/server/graphql/buildSchema";
import { context } from "~/server/graphql/graphql-context";
import { logger } from "~/server/services/logger";

const apolloServer = new ApolloServer({
  context,
  formatError: error => {
    // console.log(JSON.stringify(error.message, null, 2));
    return error;
  },
  logger,
  schema,
});

export async function startApolloServer(expressServer: Express) {
  expressServer.use(
    graphqlUploadExpress({
      maxFileSize: CONFIG.MAX_FILE_SIZE_MB * Mb,
      maxFiles: 1,
    }),
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: expressServer,
    path: CONFIG.GRAPHQL_ENDPOINT,
    ...getCors("apolloServerCors"),
  });
  logger.info("Apollo server ready");
}
