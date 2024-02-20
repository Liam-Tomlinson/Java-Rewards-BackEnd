import { MongoClient,ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const status: any = process.env.STATUS;
let uri: any
if (status === "production"){
  uri = process.env.MONGO_PRODUCTION
}
else{
  uri = process.env.MONGO
}

export const client = new MongoClient(uri,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
export const connectDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to database`)
    console.log((client as any).s.url);
    return client.db("JavaRewards");
  } catch (error) {
    console.error("Could not connect to the database", error);
    process.exit(1);
  }
};
