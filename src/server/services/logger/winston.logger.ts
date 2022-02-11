import { createLogger, format } from "winston";
import * as Transport from "winston-transport";

import { CONFIG } from "~/iso/config";
import { isDev } from "~/iso/env";
import {
  consoleTransport,
  datadogTransport,
  fileErrorTransport,
  fileTransport,
} from "~/server/services/logger/transports";

const enabledLogsConsumers: Transport[] = isDev()
  ? [fileTransport, consoleTransport]
  : [datadogTransport, consoleTransport];

if (isDev() && CONFIG.FORCE_DATADOG_IN_DEV) {
  enabledLogsConsumers.push(datadogTransport);
}

const logger = createLogger({
  defaultMeta: { "service-env": `mojo-${CONFIG.NODE_ENV}` },
  exceptionHandlers: [consoleTransport, fileErrorTransport],
  exitOnError: false,
  format: format.json(),
  level: CONFIG.LOG_LEVEL,
  transports: enabledLogsConsumers,
});

const consumersNames = enabledLogsConsumers
  .map(transport => transport.constructor.name)
  .join(", ");
logger.info(
  `Logger initialized on ${enabledLogsConsumers.length} transports "${consumersNames}"`,
);
export { logger };
