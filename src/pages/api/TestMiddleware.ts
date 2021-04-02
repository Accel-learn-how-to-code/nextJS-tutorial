import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "../../middleware/validate";
import { personSchema } from "../../schema/person";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ ...req.body, method: req.method });
};

export default validate(personSchema, handler);
