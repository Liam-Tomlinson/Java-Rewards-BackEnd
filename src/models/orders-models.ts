import { connectDatabase, client } from "../dbConnection";
import { Collection, Db } from "mongodb";
let db: Db;
let Orders: Collection
let Users: Collection
let CoffeeShop: Collection
connectDatabase().then((database) => {
    db = database
    Orders = db.collection("Orders")
    Users = db.collection("Users")
    CoffeeShop = db.collection("CoffeeShops")
});

interface Order extends Object {
    user_email?: string;
    shop_email: string;
    item: string;
    quantity: number;
    price: number;

}
interface FilterBy {
    user_id?: number;
    shop_id?: number;
    itemName?: string;
}
export const insertOrder = async (order: Order) => {
    const { user_email, shop_email, item, quantity, price } = order;
    try {
        const user = await Users.findOne({ email: user_email });
        const shop = await CoffeeShop.findOne({ email: shop_email });

        if (!user || !shop) {
            return Promise.reject({ status: 404, msg: "email not found" });
        }
        const newOrder = {
            date: new Date().toISOString(),
            totalCost: quantity * price,
            status: 'open',
            items: [
                {
                    item_name: item,
                    price: price,
                    quantity: quantity,
                },
            ],
        }
        const updateOrder = await Orders.updateOne(
            { shop_id: shop._id, user_id: user._id },
            { $push: { orders: newOrder } },
            { upsert: true }
        );


        return updateOrder;

    } catch (error) {
        throw error;
    }
};
export const fetchOrders = async (filterBy: FilterBy = {}) => {
    
    let query: any = {};

    if (filterBy.user_id !== undefined) {
        query.user_id = filterBy.user_id;
    }

    if (filterBy.shop_id !== undefined) {
        query.shop_id = filterBy.shop_id;
    }

    if (filterBy.itemName !== undefined) {
        query["orders.items.item_name"] = filterBy.itemName;
    }

    const orders = await Orders.find(query).toArray();

    return orders;
};