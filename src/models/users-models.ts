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
  name?: string;
  age?: number;
  email: string;
  avatar_url?: string;
}
export const insertUser = async (user: User) => {
  try {
    const newUser = await db.collection("Users").insertOne({
      name: user.name,
      age: user.age,
      email: user.email,
      avatar_url: user.avatar_url,
      coffee_count: 0,
    });
    let data: any = {};

    if (newUser.acknowledged) {
      data = await db.collection("Users").findOne({ _id: newUser.insertedId });
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCoffebyUserEmail = async (email: User) => {
  try {
    let updatedUser = await db
      .collection("Users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { coffee_count: 1 } },
        { returnDocument: "after" }
      );
    if (updatedUser === null) {
      return Promise.reject({
        status: 404,
        msg: "User not found",
      });
    } else {
      return updatedUser;
    }
  } catch (error) {
    throw error;
  }
};
export const fetchUserByEmail = async (email: User) => {
  const user = await db.collection("Users").find({ email: email }).toArray();
  if (user.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "email not found",
    });
  } else {
    return user;
  }
};
export const removeUserByEmail = async (email: User) => {
  const user = await db.collection("Users").deleteOne({ email: email });
  if (user.deletedCount === 0) {
    return Promise.reject({
      status: 404,
      msg: "email not found",
    });
  } else {
    return user;
  }
};
export const updateUserByEmail = async (user: User) => {
  const { email, avatar_url, name } = user;
  try {
    let updatedUser = await db
      .collection("Users")
      .findOneAndUpdate(
        { email },
        { $set: { avatar_url, name } },
        { returnDocument: "after" }
      );

    if (updatedUser === null) {
      return Promise.reject({
        status: 404,
        msg: "User not found",
      });
    } else {
      return updatedUser;
    }
  } catch (error) {
    throw error;
  }
};
