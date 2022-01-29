import express from "express";

import cors from "cors";
import compression from "compression";

const expressServer = express();
expressServer.use(cors());
expressServer.use(compression());
expressServer.use(express.json());
// server.use(express.urlencoded({ extended: true }));

export { expressServer };
