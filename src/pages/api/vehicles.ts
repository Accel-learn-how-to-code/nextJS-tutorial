import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from 'sqlite'

export default async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./mydb2.sqlite",
    driver: sqlite3.Database,
  });

  const vehicles = await db.get("SELECT * FROM Vehicle");

  res.json(vehicles);

}
