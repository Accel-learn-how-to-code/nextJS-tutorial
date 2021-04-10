import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { hash } from "bcrypt";

export default async function getAllPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = await open({
      filename: "./mydb2.sqlite",
      driver: sqlite3.Database,
    });

    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      if (!err && hash) {
        const people = await db.get(
          "INSERT INTO Person (name, email, password) values (?, ?, ?)",
          [req.body.name, req.body.email, hash]
        );
        const getPeople = await db.all("SELECT * FROM Person");
        res.json(getPeople);
      } else {
        res.json("Something wrong " + err);
      }
    });
  } else {
    res.json("We only accept POST");
  }
}
