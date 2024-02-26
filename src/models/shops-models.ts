import { connectDatabase, client } from "../dbConnection";
import { Db } from "mongodb";
let db: Db;
connectDatabase().then((database) => {
  db = database;
});

export const fetchShops = async () => {
  const shops = await db.collection("CoffeeShops").find({}).toArray();

  return shops;
};

interface Shop extends Object {
  name?: string;
  email: string;
  avatar_url?: string;
  lat?: number;
  long?: number;
  description?: string;
  location?: object;
  menu: object;
  offer:object;
}
export const insertShop = async (shop: Shop) => {
  try {
    const newShop = await db.collection("CoffeeShops").insertOne({
      name: shop.name,
      email: shop.email,
      avatar_url: shop.avatar_url,
      location: {
        lat: shop.lat,
        long: shop.long,
      },
      description: shop.description,
    });
    let data: any = {};

    if (newShop.acknowledged) {
      data = await db
        .collection("CoffeeShops")
        .findOne({ _id: newShop.insertedId });
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchShopsByEmail = async (email: Shop) => {
  const shop = await db
    .collection("CoffeeShops")
    .find({ email: email })
    .toArray();
  if (shop.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "email not found",
    });
  } else {
    return shop;
  }
};

export const removeShopsByEmail = async (email: Shop) => {
  const shop = await db.collection("CoffeeShops").deleteOne({ email: email });
  if (shop.deletedCount === 0) {
    return Promise.reject({
      status: 404,
      msg: "email not found",
    });
  } else {
    return shop;
  }
};
export const updateShopByEmail = async (shop: Shop) => {
  const { email, description, avatar_url, location } = shop;
  try {
    let updatedShop = await db
      .collection("CoffeeShops")
      .findOneAndUpdate(
        { email },
        { $set: { description, avatar_url, location } },
        { returnDocument: "after" }
      );

    if (updatedShop === null) {
      return Promise.reject({
        status: 404,
        msg: "Shop not found",
      });
    } else {
      return updatedShop;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenuByEmail = async (shop: Shop) => {
  const { email, menu } = shop;

  try {
    let updatedShop = await db
      .collection("CoffeeShops")
      .findOneAndUpdate(
        { email },
        { $set: { menu } },
        { returnDocument: "after" }
      );

    if (updatedShop === null) {
      return Promise.reject({
        status: 404,
        msg: "Shop not found",
      });
    } else {
      return updatedShop;
    }
  } catch (error) {
    throw error;
  }
};
export const fetchOffers = async () => {
  const shops = await db.collection("CoffeeShops").find({}).toArray();
  
  const offers = shops.map((shop) => {
   
    
    const offer = {
      name: shop.name,
      img: shop.offers.img,
      description: shop.offers.description,
      date: shop.offers.date,
    };

    return offer;
  });

  return offers;
};
export const updateOffersByEmail = async(email:any,shop:Shop) => {
 
  try{
let updatedOffer = await db.collection("CoffeeShops").findOneAndUpdate(
  { email },
  { $set: { offers:shop} },
  { returnDocument: "after" }
);
return updatedOffer
  }
  catch(err){throw err}
}