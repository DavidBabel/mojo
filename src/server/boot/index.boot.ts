// you cannot import anything in this file,
// because we need to init env vars in the correct order
export async function initEnvsAndStartServer() {
  const { loadEnvConfig } = await import("@next/env");
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  // await import("~/server/boot/datadog.boot");
  await import("~/server/boot/boot-guard");

  const { logger } = await import("~/server/services/logger");
  const { bootstrapApp } = await import("~/server/boot/server.boot");

  try {
    const server = await bootstrapApp();
    logger.info("Server started");
    return server;
  } catch (error) {
    logger.error("Server failed to start", error);
  }
}
