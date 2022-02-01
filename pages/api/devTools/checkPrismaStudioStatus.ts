// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "~/@types/next";

type Result = {
  isPrismaStudioStarted: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  let isPrismaStudioStarted = true;
  try {
    await fetch("http://localhost:5555");
  } catch (_) {
    isPrismaStudioStarted = false;
  }

  return res.status(200).json({ isPrismaStudioStarted });
}
