import { NextApiRequest, NextApiResponse } from "next";

export default function getAllVehicle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ hello: "world", method: req.method });
}
