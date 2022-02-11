import { format, transports } from "winston";

const consoleTransport = new transports.Console({
  format: format.cli({ all: true }),
});

export { consoleTransport };
