class CustomError extends Error {
  name = "CustomError";
}

export class AuthError extends CustomError {
  name = "AuthError";
}
