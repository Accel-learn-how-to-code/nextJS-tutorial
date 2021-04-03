import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { object, number } from "yup";

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handle: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST" || req.method === "PUT") {
      try {
        const personSChema =
          req.method === "POST"
            ? schema
            : schema.concat(object({ id: number().positive() }));
        req.body = await personSChema.validate(req.body);
        //strict: true -> các field phải theo đúng schema format
        //stripUnknown: true -> remove unknown field
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handle(req, res);
  };
}
