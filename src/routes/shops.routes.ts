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
router.get("/offers", getOffers);
router.get("/:shop_id", async (req: Request, res: Response) => {
  try {
    const shop_id = Number(req.params.shop_id);
    const shop = await db
      .collection("CoffeeShops")
      .find({ _id: shop_id })
      .toArray();

    res.status(200).send({ shop });
  } catch (err) {

    res
      .status(500)
      .send({ message: "An error occurred while fetching a shop by id." });
  }
});
router.post("/", postShop);
router.patch("/rating", async (req: Request, res: Response) => {
  try {
    const rating = Number(req.body.rating);
    const shop_email = req.body.email;

    const shop = await db.collection("CoffeeShops").findOne({ email: shop_email });

    const newTotalVotes = shop.totalRating.total_votes + 1
    const newSumOfRatings = shop.totalRating.sum_of_ratings + rating;
    const newAverageRating = newSumOfRatings / newTotalVotes;

    const newTotalRating = {
      total_votes: newTotalVotes,
      sum_of_ratings: newSumOfRatings,
      average_rating: newAverageRating
    };
const updatedShop = await db.collection("CoffeeShops").findOneAndUpdate(
      { email: shop_email },
      { $set: { totalRating: newTotalRating } },
      { returnDocument: "after" }
    );

    res.status(200).send({ shop: updatedShop });
  } catch (err) {
    res.status(500).send({ message: "An error occurred while updating rating." });
  }
});
router.post("/email", getShopByEmail);
router.delete("/email", deleteShopByEmail);
router.patch("/email", patchShopByEmail);
router.patch("/menu", patchMenuByEmail);

router.patch("/offers", patchOffersByEmail);

export { router };
