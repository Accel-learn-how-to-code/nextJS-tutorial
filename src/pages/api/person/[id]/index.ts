import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./mydb2.sqlite",
    driver: sqlite3.Database,
  });

  if (req.method === "PUT") {
    // const statement = await db.prepare(
    //   "UPDATE Person SET name=?, email=? where id=?"
    // );
    // const result = await statement.run(
    //   req.body.name,
    //   req.body.email,
    //   req.query.id
    // );

    const statement = await db.prepare(
      "UPDATE Person SET name=?, email=? where id=?"
    );
    await statement.bind(req.body.name, req.body.email, req.query.id);
    let result = await statement.get();

    // const result = await db.run(
    //   "UPDATE Person SET name=?, email=? where id=?",
    //   req.body.name,
    //   req.body.email,
    //   req.query.id
    // );
  }

  const person = await db.get("SELECT * FROM Person where id = ?", [
    req.query.id,
  ]);
  res.json(person);
}
