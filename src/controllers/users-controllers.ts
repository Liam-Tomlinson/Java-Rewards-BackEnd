import { NextFunction, Request, Response } from "express";
import { fetchUsers } from "../models/users-models";

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
