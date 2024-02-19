import { Router, Request, Response } from "express";
import { MongoClient, Db, ObjectId } from "mongodb";
import { connectDatabase, client } from "../dbConnection";
import { getUsers, postUser } from "../controllers/users-controllers";
const router = Router();
let db: Db;

connectDatabase().then((database) => {
  db = database;
});
router.get("/", getUsers);

router.get("/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;

    const user = await db
      .collection("Users")
      .find({ user_id: user_id })
      .toArray();
    res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching a user by id." });
  }
});
router.post("/", postUser);

export { router };
