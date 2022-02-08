class CustomError extends Error {
  name = "CustomError";
}

export class AuthError extends CustomError {
  name = "AuthError";
}

export class OrmError extends CustomError {
  name = "OrmError";
}

export class VideoUploadError extends CustomError {
  name = "VideoUploadError";
}
