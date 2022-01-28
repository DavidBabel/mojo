import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";

import { schema } from "~/server/graphql/buildSchema";
import { context } from "~/server/prisma/context";
import { filePayloadMiddleware } from "~/server/next-middleware/filePayload.middleware";
import runMiddleware from "~/server/next-middleware/runMiddleware";
import { CONFIG } from "~/iso/config";

import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import type { RequestHandler } from "micro";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  context,
  schema,
});

const startServer = server.start();

async function graphqlRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  const gqlHandler = server.createHandler({ path: CONFIG.GRAPHQL_ENDPOINT });

  await runMiddleware(req, res, filePayloadMiddleware);
  return await gqlHandler(req, res);
}

const withCors = Cors();
export default withCors(graphqlRequestHandler as RequestHandler);
