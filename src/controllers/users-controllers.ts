import { NextFunction, Request, Response } from "express";
import {
  fetchUserByEmail,
  fetchUsers,
  insertUser,
  updateCoffebyUserEmail,
  removeUserByEmail,
  updateUserByEmail,
} from "../models/users-models";

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
    const newUser = req.body;
    const user = await insertUser(newUser);

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
};
export const patchUserCoffee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const user = await updateCoffebyUserEmail(email);

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
};
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    const user = await fetchUserByEmail(email);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
export const deleteUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const removed = await removeUserByEmail(email);
    res.status(204).send({ msg: "Shop Removed" });
  } catch (error) {
    next(error);
  }
};

export const patchUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upUser = req.body;
    const user = await updateUserByEmail(upUser);

    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
};
