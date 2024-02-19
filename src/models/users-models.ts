import { connectDatabase, client } from "../dbConnection";
import { Db } from "mongodb";
let db: Db;
connectDatabase().then((database) => {
  db = database;
});

export const fetchUsers = async () => {
    console.log("hello");
    
 const  users = await db.collection("Users").find({}).toArray();
 console.log(users,"user");
 
 return users
};
