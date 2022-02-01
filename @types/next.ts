import {
  NextApiRequest as NextApiRequestReal,
  NextApiResponse as NextApiResponseReal,
} from "next";

export interface NextApiRequest<T = any> extends NextApiRequestReal {
  body: T;
}

export type NextApiResponse<T = any> = NextApiResponseReal<T>;
