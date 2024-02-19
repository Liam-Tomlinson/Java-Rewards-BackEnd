import { NextFunction, Request, Response } from "express";
import { fetchUsers, insertUser } from "../models/users-models";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await fetchUsers();
  try {
    res.send({ users });
  } catch (error) {
    next(error);
  }
};
export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const newUser = await insertUser(user);

    res.status(201).send(newUser);
  } catch (error) {
    
    next(error);
  }
};
