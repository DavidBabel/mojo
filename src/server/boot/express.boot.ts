import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { CONFIG } from "~/iso/config";

const expressServer = express();
expressServer.use(cors());
expressServer.use(compression());
expressServer.use(cookieParser());
expressServer.use(
  express.json({ limit: `${String(CONFIG.MAX_FILE_SIZE_MB)}mb` }),
);
expressServer.use(express.urlencoded({ extended: true }));

export { expressServer };
