import { Router, Request, Response } from "express";
import { MongoClient, Db,ObjectId } from 'mongodb';
import { connectDatabase,client} from '../dbConnection';
const router = Router();
let db: Db ;

connectDatabase().then((database) => {
  db=database

});
router.get('/', async (req: Request, res: Response) => {
  try {
    
    const users = await db.collection("Users").find({}).toArray();
    res.status(200).send({users});
    
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred while fetching users." });
  }
});

export { router };