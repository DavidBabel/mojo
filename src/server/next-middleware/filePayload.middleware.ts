import { GraphQLOperation, processRequest } from "graphql-upload";
import type { NextApiRequest, NextApiResponse } from "next";

interface NextPayloadApiRequest extends NextApiRequest {
  filePayload: GraphQLOperation | GraphQLOperation[];
}

/**
 * Allows graphQl to handle file uploads
 */
export async function filePayloadMiddleware(
  req: NextPayloadApiRequest,
  res: NextApiResponse,
  next: (result?: any) => void,
) {
  const contentType = req.headers["content-type"];
  if (contentType?.startsWith("multipart/form-data")) {
    req.filePayload = await processRequest(req, res);
  }
  next();
}
