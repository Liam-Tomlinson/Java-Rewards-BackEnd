import { NextFunction, Request, Response } from "express";
import { fetchOrders, fetchTotalItems, insertOrder, updateOrderById } from "../models/orders-models";

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
      const { user_id, shop_id, month,year } = req.query
console.log(user_id)
      const filterBy:any = {
          user_id: user_id,
          shop_id: shop_id ,
          month: month ? month : undefined,
          year: year ? year : undefined
      };

      const orders = await fetchOrders(filterBy);

      res.send({ orders });
  } catch (error) {
      next(error);
  }
};
export const patchOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.body;
    const order = await updateOrderById(orderId);

    res.status(200).send({ order });
  } catch (error) {
    next(error);
  }
};
export const getTotalItems = async (req: Request, res: Response, next: NextFunction) =>{
  const { shop_id } = req.params
    
  const data = await fetchTotalItems(shop_id)
  res.send(data);
}