import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handle: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST" || req.method === "PUT") {
      try {
        req.body = await schema.validate(req.body, {strict: true});
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handle(req, res);
  };
}

