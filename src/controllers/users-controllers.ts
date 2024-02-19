import { NextFunction, Request, Response } from "express";
import { fetchUsers, insertUser } from "../models/users-models";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await fetchUsers();
  try {
    res.send({ users });
  } catch (error) {
    next(error);
  }
};
export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    const user = await insertUser(newUser);

    res.status(201).send({user});
  } catch (error) {

    next(error);
  }
};
