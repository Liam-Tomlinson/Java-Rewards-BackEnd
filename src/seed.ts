import { connectDatabase, client } from "./dbConnection";
import { ObjectId } from "mongodb";
import { shopData } from "./test_data/shopData";
import {userData} from './test_data/userData'
import { ordersData } from "./test_data/ordersData";

export const populateTestData = async () => {
  const db = await connectDatabase();
  console.log("Dropping database...");
  await db.dropDatabase();

  const shops = db.collection("CoffeeShops");
  const users = db.collection("Users");
  const orders = db.collection("Orders");
  db.collection("CoffeeShops").createIndex({ name: 1 }, { unique: true });
  db.collection("Users").createIndex({ email: 1 }, { unique: true });

  await shops.insertMany(shopData);

  await users.insertMany(userData);

  await orders.insertMany(ordersData);

  console.log("Test data has been populated.");
};
