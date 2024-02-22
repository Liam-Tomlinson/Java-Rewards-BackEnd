import { NextFunction, Request, Response } from "express";
import {
  fetchShops,
  insertShop,
  fetchShopsByEmail,
  removeShopsByEmail,
  updateShopByEmail,
  updateMenuByEmail,
  fetchOffers,
  updateOffersByEmail,
} from "../models/shops-models";

export const getShops = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const shops = await fetchShops();
  try {
    res.send({ shops });
  } catch (error) {
    next(error);
  }
};
export const postShop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newShop = req.body;
    const shop = await insertShop(newShop);

    res.status(201).send({ shop });
  } catch (error) {
    next(error);
  }
};
export const getShopByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    const shop = await fetchShopsByEmail(email);
    res.status(200).send({ shop });
  } catch (error) {
    next(error);
  }
};
export const deleteShopByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const removed = await removeShopsByEmail(email);
    res.status(204).send({ msg: "Shop Removed" });
  } catch (error) {
    next(error);
  }
};
export const patchShopByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upShop = req.body;
    const shop = await updateShopByEmail(upShop);

    res.status(201).send({ shop });
  } catch (error) {
    next(error);
  }
};

export const patchMenuByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upMenu = req.body;
    const menu = await updateMenuByEmail(upMenu);
    res.status(200).send(menu.menu);
  } catch (error) {
    next(error);
  }
};
export const getOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const offers = await fetchOffers();
  try {
    res.send({ offers });
  } catch (error) {
    next(error);
  }
};

export const patchOffersByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {email,offers} = req.body;
    console.log(offers)
    const offer = await updateOffersByEmail(email,offers);
    res.status(200).send(offer);
  } catch (error) {
    next(error);
  }
};