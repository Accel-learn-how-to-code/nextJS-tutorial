import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { verify } from "jsonwebtoken";
import { secret } from "../../../api/secret";

const authenciated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.headers.authorization!, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.json("Some Error Happen");
  });
};

export default authenciated(async function getAllPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./mydb2.sqlite",
    driver: sqlite3.Database,
  });

  const people = await db.all("SELECT name, email FROM Person");
  res.json(people);
});
