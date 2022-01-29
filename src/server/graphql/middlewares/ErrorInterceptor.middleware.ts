import { MiddlewareFn } from "type-graphql";

export const ErrorInterceptorMiddleware: MiddlewareFn<any> = async (
  { context, info },
  next,
) => {
  try {
    return await next();
  } catch (err) {
    // console.log(err, context, info);
    throw err;
  }
};
