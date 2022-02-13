import type { ErrorNameKeys } from "~/@types/errors";
import { logger } from "~/server/services/logger";

const withStackTrace: LogLevel[] = ["error", "crit", "alert", "emerg"];

class CustomError extends Error {
  name = "CustomError";
  level: LogLevel = "error";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.message = message;
  }
  errorLogger() {
    const { level, message, name, stack } = this;
    const log = withStackTrace.includes(level) ? stack : `${name}: ${message}`;
    logger[level](log);
  }
}

export class AuthError extends CustomError {
  name = "AuthError";
  level: LogLevel = "info";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class GraphQLCustomError extends CustomError {
  name = "GraphQLCustomError";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class NotFoundError extends CustomError {
  name = "NotFoundError";
  level: LogLevel = "warning";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class OrmError extends CustomError {
  name = "OrmError";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class RegisterError extends CustomError {
  name = "RegisterError";
  level: LogLevel = "warning";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class RightsError extends CustomError {
  name = "RightsError";
  level: LogLevel = "warning";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class VideoUploadError extends CustomError {
  name = "VideoUploadError";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
export class UnknownError extends CustomError {
  name = "UnknownError";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.errorLogger();
  }
}
