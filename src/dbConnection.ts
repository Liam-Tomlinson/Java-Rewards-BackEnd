import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const STATUS: any = process.env.STATUS;
console.log(STATUS)

export const client = new MongoClient("mongodb://localhost:27017/javarewards_test");

export const connectDatabase = async () => {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Could not connect to the database", error);
    process.exit(1);
  }
};
