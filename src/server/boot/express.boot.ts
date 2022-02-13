import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { CONFIG } from "~/iso/config";
import { getCors } from "~/iso/cors";
import { isDev } from "~/iso/env";
import { logger } from "~/server/services/logger";

const expressServer = express();
if (isDev()) {
  expressServer.use(cors(getCors("expressServerCors")));
}
expressServer.use(compression());
expressServer.use(cookieParser());
expressServer.use(
  express.json({ limit: `${String(CONFIG.MAX_FILE_SIZE_MB)}mb` }),
);
expressServer.use(express.urlencoded({ extended: true }));

logger.info("Express server ready");

export { expressServer };
