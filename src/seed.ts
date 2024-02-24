import { connectDatabase, client } from "./dbConnection";
import { ObjectId } from "mongodb";
import { shopData } from "./test_data/shopData";
import {userData} from './test_data/userData'
import { ordersData } from "./test_data/ordersData";

export const populateTestData = async () => {
  const db = await connectDatabase();
  console.log("Dropping database...");
  await db.dropDatabase();

  const Shops = db.collection("CoffeeShops");
  const Users = db.collection("Users");
  const Orders = db.collection("Orders");
  Shops.createIndex({ name: 1 }, { unique: true });
  Users.createIndex({ email: 1 }, { unique: true });
  Orders.createIndex({ "orders.order_id": 1 });

  await Shops.insertMany(shopData);

  await Users.insertMany(userData);

  await Orders.insertMany(ordersData);

  console.log("Test data has been populated.");
};
