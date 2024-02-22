import { Router, Request, Response } from "express";
import { MongoClient, Db, ObjectId } from "mongodb";
import { connectDatabase, client } from "../dbConnection";
import {
  getShops,
  postShop,
  getShopByEmail,
  deleteShopByEmail,
  patchShopByEmail,
  patchMenuByEmail,
  getOffers,
  patchOffersByEmail,
} from "../controllers/shops-controllers";
const router = Router();
let db: Db;

connectDatabase().then((database) => {
  db = database;
});

router.get("/", getShops);
router.post("/", postShop);
router.post("/email", getShopByEmail);
router.delete("/email", deleteShopByEmail);
router.patch("/email", patchShopByEmail);
router.patch("/menu", patchMenuByEmail);
router.get("/offers", getOffers);
router.patch("/offers", patchOffersByEmail);

export { router };
