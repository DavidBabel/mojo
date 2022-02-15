import { IncomingMessage, ServerResponse } from "http";
import next from "next";

import { CONFIG } from "~/iso/config";
import { isDev, isTests } from "~/iso/env";
import { logger } from "~/server/services/logger";

const port = CONFIG.PORT;
const hostname = CONFIG.HOSTNAME;

const nextApp = next({ dev: isDev() || isTests(), hostname, port });
const nextRequestHandler = nextApp.getRequestHandler();

export async function startNextJs() {
  await nextApp.prepare();

  logger.info("Next.js server ready");
  return (req: IncomingMessage, res: ServerResponse) => {
    return nextRequestHandler(req, res);
  };
}
