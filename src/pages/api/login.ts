import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { compare, hash } from "bcrypt";

export default async function getAllPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./mydb2.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "POST") {
    const person = await db.get("SELECT * FROM Person where email = ?", [
      req.body.email,
    ]);
    compare(req.body.password, person.password, async function (err, result) {
      // result == true
      if (!err && result) {
        res.json("Name: " + person.name + ". Email: " + person.email);
      } else {
        res.json("Something wrong " + err);
      }
    });
  } else {
    res.json("We only accept POST");
  }
}
