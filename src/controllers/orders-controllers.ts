import { NextFunction, Request, Response } from "express";
import { fetchOrders, insertOrder } from "../models/orders-models";

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = req.body;
    const order = await insertOrder(newOrder);

    res.status(201).send({ order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { user_id, shop_id, itemName } = req.query

      const filterBy = {
          user_id: user_id ? parseInt(user_id as string, 10) : undefined,
          shop_id: shop_id ? parseInt(shop_id as string, 10) : undefined,
          itemName: itemName ? itemName as string : undefined,
      };

      const orders = await fetchOrders(filterBy);

      res.send({ orders });
  } catch (error) {
      next(error);
  }
};