import compression from "compression";
import cors from "cors";
import express from "express";

const expressServer = express();
expressServer.use(cors());
expressServer.use(compression());
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));

export { expressServer };
