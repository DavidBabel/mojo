import "reflect-metadata";

import { CONFIG } from "~/iso/config";
import { isDev } from "~/iso/env";
import { startApolloServer } from "~/server/boot/apolloServer.boot";
import { expressServer, staticDir } from "~/server/boot/express.boot";
import { startNextJs } from "~/server/boot/nextjs.boot";

const port = CONFIG.PORT;
const env = CONFIG.NODE_ENV;

export async function bootstrapApp() {
  await startApolloServer(expressServer);

  expressServer.use("/storybook", staticDir("storybook-static"));

  // only launch nextjs on same port in production
  if (!isDev()) {
    const nextRequestHandler = await startNextJs();
    expressServer.get("*", nextRequestHandler);
    expressServer.post("*", nextRequestHandler);
  } else {
    expressServer.get("*", (_, res) => {
      return res.send(
        "<p>for dev env, use : <a href='http://localhost:4000'>http://localhost:4000</p>",
      );
    });
  }

  expressServer.listen(port, () => {
    const url = `http://localhost:${isDev() ? 4000 : port}`;
    const graphql = `http://localhost:${port}${CONFIG.GRAPHQL_ENDPOINT}`;
    const prismaStudio = `http://localhost:5555`;
    const storybook = `http://localhost:${port}/storybook`;
    console.log(
      ` 🚀 ${env} server ready at ${url}\n`,
      `🔷 GraphQL API ready at ${graphql}\n`,
      `🔺 Prisma studio should be available at ${prismaStudio}\n`,
      `📖 If built, storybook is at ${storybook}`,
    );
  });

  return expressServer;
}
