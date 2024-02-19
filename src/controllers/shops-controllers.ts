import { NextFunction, Request, Response } from "express";
import { fetchShops, insertShop } from "../models/users-models";

export const getShops = async (req: Request, res: Response, next: NextFunction) => {
  const shops = await fetchShops();
  try {
    res.send({ shops });
  } catch (error) {
    next(error);
  }
};
export const postShop = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newShop = req.body;
    const shop = await insertShop(newShop);

    res.status(201).send({shop});
  } catch (error) {

    next(error);
  }
};
