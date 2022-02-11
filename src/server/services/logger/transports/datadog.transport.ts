import { transports } from "winston";

import { CONFIG } from "~/iso/config";

const datadogTransport = new transports.Http({
  host: "http-intake.logs.datadoghq.eu",
  path: `/api/v2/logs?dd-api-key=${CONFIG.DD_API_KEY}&ddsource=nodejs&service=${CONFIG.DD_SERVICE}`,
  ssl: true,
});
datadogTransport.on("error", error => {
  console.error("LOG ERROR DATADOG:", error);
});

export { datadogTransport };
