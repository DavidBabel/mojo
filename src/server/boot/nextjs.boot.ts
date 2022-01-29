import next from "next";

import { isDev } from "~/iso/env";

const nextApp = next({ dev: isDev() });
const nextRequestHandler = nextApp.getRequestHandler();

export async function startNextJs() {
  await nextApp.prepare();

  return nextRequestHandler;
}
