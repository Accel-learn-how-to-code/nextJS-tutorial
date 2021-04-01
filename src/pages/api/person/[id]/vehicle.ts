import { NextApiRequest, NextApiResponse } from "next";

export default function getAllVehicleByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ byId: req.query.id, hello: "getAllVehicleByPersonId", method: req.method });
}
