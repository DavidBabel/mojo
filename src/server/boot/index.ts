// you cannot import anything in this file, because we need to init env vars
import { loadEnvConfig } from "@next/env";

async function initEnvsAndStartServer() {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  await import("~/server/boot/datadog.boot");
  await import("~/server/boot/boot-guard");

  const { logger } = await import("~/server/services/logger");
  const { bootstrapApp } = await import("~/server/boot/server.boot");

  await bootstrapApp()
    .then(() => {
      logger.info("Server started");
    })
    .catch((error: unknown) => {
      logger.error("Server failed to start", error);
    });
}

// entrypoint
initEnvsAndStartServer();
