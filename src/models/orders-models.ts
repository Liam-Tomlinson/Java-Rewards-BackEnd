import { connectDatabase, client } from "../dbConnection";
import { Collection, Db, ObjectId } from "mongodb";
let db: Db;
let Orders: Collection;
let Users: Collection;
let CoffeeShop: Collection;
connectDatabase().then((database) => {
  db = database;
  Orders = db.collection("Orders");
  Users = db.collection("Users");
  CoffeeShop = db.collection("CoffeeShops");
});

interface Order extends Object {
  user_email?: string;
  shop_email: string;
  items: Item[];
  quantity: number;
  price: number;
  shop_id?: any;
  item: string;


}
interface FilterBy {
  user_id?: number;
  shop_id?: number;
  itemName?: string;
}
type Item = {
  item_name: string;
  quantity: number;
  price: number;
};
export const insertOrder = async (order: Order) => {
  const { user_email, shop_email, items } = order;
  if (!user_email || !shop_email || !items) {
    return Promise.reject({
      status: 400,
      msg: "Missing properties on Order body request",
    });
  }
  for (const item of items) {
    if (!item.item_name || item.quantity == null || item.price == null) {
      return Promise.reject({
        status: 400,
        msg: "Missing properties in item of Order body request",
      });
    }
  }
  try {
    const user = await Users.findOne({ email: user_email });
    const shop = await CoffeeShop.findOne({ email: shop_email });

    // make order_id increments by 1 and is unique to avoid using ObjectId()
    const highestId = await Orders.aggregate([
      { $unwind: "$orders" },
      { $group: { _id: null, maxOrderId: { $max: "$orders.order_id" } } },
      { $project: { _id: 0, maxOrderId: 1 } }
    ]).toArray()
    let currentHighestId = highestId[0].maxOrderId
    //

    if (!user || !shop) {
      return Promise.reject({ status: 404, msg: "email not found" });
    }
    const totalCost = items.reduce((acc, currentItem) => {
      return acc + currentItem.quantity * currentItem.price;
    }, 0);

    const newOrder: any = {
      order_id: ++currentHighestId,
      date: new Date().toISOString(),
      totalCost: totalCost,
      status: "open",
      items: items
    };
    const updateOrder = await Orders.findOneAndUpdate(
      { shop_id: shop._id, user_id: user._id },
      { $push: { orders: newOrder } },
      { returnDocument: "after", upsert: true },

    );
    const insertedOrder = updateOrder?.orders[updateOrder.orders.length - 1] ?? null

    return insertedOrder;
  } catch (error) {
    throw error;
  }
};
export const fetchOrders = async (filterBy: FilterBy = {}) => {
  let query: any = {};
let orders
let pipeline
  if (filterBy.user_id && !filterBy.shop_id) {
    pipeline = [
      { $match: { 'user_id': filterBy.user_id } },
      { $unwind: '$orders' },
      {
        $project: {
          _id: 0,
          order: {
            order_id: '$orders.order_id',
            user_id: '$user_id',
            date: '$orders.date',
            totalCost: '$orders.totalCost',
            status: '$orders.status',
            items: '$orders.items'
          }
        }
      },
      {
        $group: {
          _id: null,
          orders: { $push: '$order' }
        }
      },
      {
        $project: {
          _id: 0,
          orders: 1
        }
      }
  
    ];
    orders = await Orders.aggregate(pipeline).toArray();
  }
  else if (filterBy.shop_id && !filterBy.user_id) {
    pipeline = [
      { $match: { 'shop_id': filterBy.shop_id } },
      { $unwind: '$orders' },
      {
        $project: {
          _id: 0,
          shop_id: 1,
          order: {
            order_id: '$orders.order_id',
            user_id: '$user_id',
            date: '$orders.date',
            totalCost: '$orders.totalCost',
            status: '$orders.status',
            items: '$orders.items'
          }
        }
      },
      {
        $sort: {
          'order.date': 1
        }
      },
      {
        $group: {
          _id: null,
          shop_id: { $first: '$shop_id' },
          orders: { $push: '$order' }
        }
      },
      {
        $project: {
          _id: 0,
          shop_id: 1,
          orders: 1
        }
      }
  
    ];
    orders = await Orders.aggregate(pipeline).toArray();
  }
  else if (filterBy.shop_id && filterBy.user_id) {
    query.user_id = filterBy.user_id
    query.shop_id = filterBy.shop_id;
    
    orders = await Orders.find(query).toArray();
  }
  else{ 
    orders = await Orders.find(query).toArray();
  }
    
  return orders;
};
export const updateOrderById = async (order: Order) => {
  const { order_id } = order;

  try {
    let updatedStatus = await Orders.findOneAndUpdate(
      { "orders.order_id": order_id },
      { $set: { "orders.$.status": "closed" } },
      { returnDocument: "after" }
    );
    console.log(updatedStatus, "in model");
    if (updatedStatus === null) {
      return Promise.reject({
        status: 404,
        msg: "Id not found",
      });
    } else {
      return updatedStatus;
    }
  } catch (error) {
    throw error;
  }
};

async function getOrdersByMonth(db, year, month) {
  const collection = db.collection('Orders');
  const pipeline = [
    {
      $match: {
        'orders.date': {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1)
        }
      }
    }
  ];
  const result = await collection.aggregate(pipeline).toArray();
  return result;
}
async function getOrdersByShopId(db, shopId) {
  const collection = db.collection('Orders');
  const pipeline = [
    {
      $match: { 'orders.shop_id': shopId }
    }
  ];
  const result = await collection.aggregate(pipeline).toArray();
  return result;
}