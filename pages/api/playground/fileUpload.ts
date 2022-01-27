import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  console.log("handling file");
  console.log(req);
  return res.status(200).send("");
};

export default handler;
