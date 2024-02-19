import { Router, Request, Response } from "express";
import { MongoClient, Db, ObjectId } from "mongodb";
import { connectDatabase, client } from "../dbConnection";
import { getShops,postShop } from "../controllers/shops-controllers";
const router = Router();
let db: Db;

connectDatabase().then((database) => {
  db = database;
});

router.get("/", getShops);
router.post("/", postShop);

export { router };
