import { Router, Request, Response } from "express";
import { MongoClient, Db, ObjectId } from "mongodb";
import { connectDatabase, client } from "../dbConnection";
const router = Router();
let db: Db;

connectDatabase().then((database) => {
  db = database;
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await db.collection("Users").find({}).toArray();
    res.status(200).send({ users });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching users." });
  }
});

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
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    const response = await db
      .collection("Users")
      .insertOne({
        name: newUser.name,
        age: newUser.age,
        email: newUser.email,
        avatar_url: newUser.avatar_url,
        coffee_count: 0,
      });
    res.status(201).send({ response });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching a user by id." });
  }
});

export { router };
