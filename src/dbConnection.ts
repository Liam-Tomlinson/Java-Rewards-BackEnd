import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const STATUS = process.env.STATUS ||  "development";
let client : any
console.log(STATUS,"DBDBD");
if (STATUS === "development") {
  client = new MongoClient("mongodb://localhost:27017/javarewards_test");
  
  
} else {
  console.log("hello");
  
}

// let client
const username = encodeURIComponent("alexis");
const password = encodeURIComponent("uR5wjAEPWE0LddGL");
let uri = `mongodb+srv://${username}:${password}@javarewards.555wnsg.mongodb.net/?retryWrites=true&w=majority`;
// if(production)const newClient = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export const client = new MongoClient("http://192.168.100.47:5050/shops");

export const connectDatabase = async () => {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Could not connect to the database", error);
    process.exit(1);
  }
};
