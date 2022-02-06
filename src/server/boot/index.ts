import { loadEnvConfig } from "@next/env";

async function initEnvsAndStartServer() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const { bootstrapApp } = require("./server.boot");

  await bootstrapApp();
}

// entrypoint
initEnvsAndStartServer();
