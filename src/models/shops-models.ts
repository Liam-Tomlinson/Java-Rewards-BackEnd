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
    name?: string,
    email: string,
    avatar_url?: string,
    lat?: number,
    long?: number,
    description?:string

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

        return newShop;
    }
    catch (error) { throw error }
};
