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

interface User extends Object {
  name?: string,
  age?: number,
  email: string,
  avatar_url?: string,
}
export const insertUser = async (user: User) => {
  try{
  const newUser = await db.collection("Users").insertOne({
    name: user.name,
    age: user.age,
    email: user.email,
    avatar_url: user.avatar_url,
    coffee_count: 0,
  });
 
  return newUser;
}
catch(error){ throw error}
};

export const updateCoffebyUserEmail = async (email: User) => {
  try{
    let updatedUser = await db.collection('Users').findOneAndUpdate(
      { email: email },
      { $inc: { "coffee_count": 1 } },
      { returnDocument: 'after' }
    );
    return updatedUser
}
catch(error){ throw error}
};
