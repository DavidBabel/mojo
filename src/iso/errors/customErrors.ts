import type { ErrorNameKeys } from "~/@types/errors";

class CustomError extends Error {
  name = "CustomError";
  constructor(message: ErrorNameKeys) {
    super(message);
    this.message = message;
  }
}

export class AuthError extends CustomError {
  name = "AuthError";
}
export class GraphQLCustomError extends CustomError {
  name = "GraphQLCustomError";
}
export class NotFoundError extends CustomError {
  name = "NotFoundError";
}
export class OrmError extends CustomError {
  name = "OrmError";
}
export class RegisterError extends CustomError {
  name = "RegisterError";
}
export class RightsError extends CustomError {
  name = "RightsError";
}
export class VideoUploadError extends CustomError {
  name = "VideoUploadError";
}
