import { transports } from "winston";

const fileTransport = new transports.File({
  dirname: "log",
  filename: `app.log`,
});
fileTransport.on("error", error => {
  console.error("LOG ERROR:", error);
});

const fileErrorTransport = new transports.File({
  dirname: "log",
  filename: `crash.log`,
});
fileTransport.on("error", error => {
  console.error("LOG ERROR:", error);
});

export { fileErrorTransport, fileTransport };
