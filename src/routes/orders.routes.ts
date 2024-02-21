import { Router } from "express";
import {  Db  } from "mongodb";
import { connectDatabase } from "../dbConnection";
import { getOrders, patchOrderById, postOrder } from "../controllers/orders-controllers";

const router = Router();
let db: Db;

connectDatabase().then((database) => {
  db = database;
});

router.post("/",postOrder)
router.get("/",getOrders)
router.patch("/status",patchOrderById)

export { router };