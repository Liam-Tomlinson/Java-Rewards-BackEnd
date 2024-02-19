import { connectDatabase, client } from "../dbConnection";
import { Db } from "mongodb";
let db: Db;
connectDatabase().then((database) => {
  db = database;
});

export const fetchUsers = async () => {
  const users = await db.collection("Users").find({}).toArray();

  return users;
};

export const insertUser = async (user: any) => {
  const newUser = await db.collection("Users").insertOne({
    name: user.name,
    age: user.age,
    email: user.email,
    avatar_url: user.avatar_url,
    coffee_count: 0,
  });

  return newUser;
};
