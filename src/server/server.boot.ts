import "reflect-metadata";
import { loadEnvConfig } from "@next/env";

import { expressServer } from "~/server/boot/express.boot";
import { startApolloServer } from "~/server/boot/apolloServer.boot";
import { startNextJs } from "~/server/boot/nextjs.boot";

import { CONFIG } from "~/iso/config";
import { ENV, isProd } from "~/iso/env";

const port = CONFIG.PORT;
const env = ENV("NODE_ENV");

async function bootstrapApp() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  await startApolloServer(expressServer);

  // only launch nextjs on same port in production
  if (isProd()) {
    const nextRequestHandler = await startNextJs();

    expressServer.get("*", (req, res) => {
      return nextRequestHandler(req, res);
    });
  } else {
    expressServer.get("*", (req, res) => {
      return res.send(
        "<p>use : <a href='http://localhost:4000'>http://localhost:4000</p>",
      );
    });
  }

  expressServer.listen(port, () => {
    const url = `http://localhost:${isProd() ? port : 4000}`;
    const graphql = `http://localhost:${port}${CONFIG.GRAPHQL_ENDPOINT}`;
    console.log(
      ` 🚀 ${env} server ready at ${url}\n`,
      `🚀 GraphQL API ready at ${graphql}`,
    );
  });
}

bootstrapApp();
