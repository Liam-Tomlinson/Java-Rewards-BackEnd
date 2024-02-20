import { MongoClient } from "mongodb";

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
