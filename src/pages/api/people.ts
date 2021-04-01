import { NextApiRequest, NextApiResponse } from "next";

export default function getAllPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ hello: "getAllPeople", method: req.method });
}
