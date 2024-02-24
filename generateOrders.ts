const fs = require('fs');
const ordersData: any = [
    { _id: 1, shop_id: 3, user_id: 4, orders: [{ order_id: 10, date: "2023-12-20T10:00:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Espresso", price: 2.0, quantity: 2 }, { item_name: "Caffè Latte", price: 4.0, quantity: 1 }] }, { order_id: 11, date: "2024-01-10T11:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Cappuccino", price: 3.0, quantity: 3 }, { item_name: "Flat White", price: 4.5, quantity: 1 }] }] },
    { _id: 2, shop_id: 4, user_id: 5, orders: [{ order_id: 12, date: "2023-12-22T12:00:00.000Z", totalCost: 18.0, status: "open", items: [{ item_name: "Americano", price: 2.5, quantity: 2 }, { item_name: "Mocha", price: 5.0, quantity: 1 }] }, { order_id: 13, date: "2024-01-12T13:30:00.000Z", totalCost: 20.0, status: "open", items: [{ item_name: "Iced Coffee", price: 3.0, quantity: 3 }, { item_name: "Irish Coffee", price: 5.5, quantity: 1 }] }] },
    { _id: 3, shop_id: 2, user_id: 6, orders: [{ order_id: 14, date: "2023-12-24T09:00:00.000Z", totalCost: 14.0, status: "open", items: [{ item_name: "Espresso", price: 2.0, quantity: 2 }, { item_name: "Cappuccino", price: 4.0, quantity: 1 }] }, { order_id: 15, date: "2024-01-14T10:30:00.000Z", totalCost: 18.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.0, quantity: 3 }, { item_name: "Mocha", price: 5.5, quantity: 1 }] }] },
    { _id: 4, shop_id: 3, user_id: 7, orders: [{ order_id: 16, date: "2023-12-28T11:00:00.000Z", totalCost: 17.0, status: "open", items: [{ item_name: "Americano", price: 2.5, quantity: 2 }, { item_name: "Flat White", price: 4.0, quantity: 1 }] }, { order_id: 17, date: "2024-01-18T12:45:00.000Z", totalCost: 22.0, status: "open", items: [{ item_name: "Macchiato", price: 3.0, quantity: 3 }, { item_name: "Affogato", price: 6.0, quantity: 1 }] }] },
    { _id: 5, shop_id: 4, user_id: 8, orders: [{ order_id: 18, date: "2023-12-30T14:00:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Iced Coffee", price: 2.0, quantity: 2 }, { item_name: "Irish Coffee", price: 4.5, quantity: 1 }] }, { order_id: 19, date: "2024-01-20T15:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 3 }, { item_name: "Cappuccino", price: 5.0, quantity: 1 }] }] },
    { _id: 6, shop_id: 1, user_id: 9, orders: [{ order_id: 20, date: "2023-12-26T16:00:00.000Z", totalCost: 20.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.5, quantity: 2 }, { item_name: "Caffè Mocha", price: 5.0, quantity: 1 }] }, { order_id: 21, date: "2024-01-16T08:15:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.0, quantity: 3 }, { item_name: "Flat White", price: 4.0, quantity: 1 }] }] },
    { _id: 7, shop_id: 2, user_id: 10, orders: [{ order_id: 22, date: "2023-12-23T09:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 2 }, { item_name: "Caffè Latte", price: 4.0, quantity: 1 }] }, { order_id: 23, date: "2024-01-13T10:45:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.5, quantity: 3 }, { item_name: "Mocha", price: 4.5, quantity: 1 }] }] },
    { _id: 8, shop_id: 3, user_id: 6, orders: [{ order_id: 24, date: "2023-12-27T10:00:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Espresso", price: 2.0, quantity: 2 }, { item_name: "Cappuccino", price: 4.0, quantity: 1 }] }, { order_id: 25, date: "2024-01-17T11:30:00.000Z", totalCost: 18.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.0, quantity: 3 }, { item_name: "Mocha", price: 5.5, quantity: 1 }] }] },
    { _id: 9, shop_id: 4, user_id: 7, orders: [{ order_id: 26, date: "2023-12-29T12:00:00.000Z", totalCost: 17.0, status: "open", items: [{ item_name: "Americano", price: 2.5, quantity: 2 }, { item_name: "Flat White", price: 4.0, quantity: 1 }] }, { order_id: 27, date: "2024-01-19T13:45:00.000Z", totalCost: 22.0, status: "open", items: [{ item_name: "Macchiato", price: 3.0, quantity: 3 }, { item_name: "Affogato", price: 6.0, quantity: 1 }] }] },
    { _id: 10, shop_id: 1, user_id: 8, orders: [{ order_id: 28, date: "2023-12-31T14:00:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Iced Coffee", price: 2.0, quantity: 2 }, { item_name: "Irish Coffee", price: 4.5, quantity: 1 }] }, { order_id: 29, date: "2024-01-21T15:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 3 }, { item_name: "Cappuccino", price: 5.0, quantity: 1 }] }] },
    { _id: 11, shop_id: 2, user_id: 9, orders: [{ order_id: 30, date: "2023-12-25T16:00:00.000Z", totalCost: 20.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.5, quantity: 2 }, { item_name: "Caffè Mocha", price: 5.0, quantity: 1 }] }, { order_id: 31, date: "2024-01-15T08:15:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.0, quantity: 3 }, { item_name: "Flat White", price: 4.0, quantity: 1 }] }] },
    { _id: 12, shop_id: 3, user_id: 10, orders: [{ order_id: 32, date: "2023-12-26T09:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 2 }, { item_name: "Caffè Latte", price: 4.0, quantity: 1 }] }, { order_id: 33, date: "2024-01-16T10:45:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.5, quantity: 3 }, { item_name: "Mocha", price: 4.5, quantity: 1 }] }] },
    { _id: 35, shop_id: 1, user_id: 1, orders: [{ order_id: 100, date: "2023-12-26T09:30:00.000Z", totalCost: 19.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 2 }, { item_name: "Caffè Latte", price: 4.0, quantity: 1 }] }, { order_id: 101, date: "2024-01-16T10:45:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.5, quantity: 3 }, { item_name: "Mocha", price: 4.5, quantity: 1 }] }] },
    { _id: 21, shop_id: 4, user_id: 3, orders: [{ order_id: 50, date: "2023-12-30T11:00:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Iced Coffee", price: 2.0, quantity: 2 }, { item_name: "Irish Coffee", price: 4.5, quantity: 1 }] }, { order_id: 51, date: "2024-01-20T12:30:00.000Z", totalCost: 20.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 3 }, { item_name: "Cappuccino", price: 5.0, quantity: 1 }] }] },
    { _id: 22, shop_id: 1, user_id: 4, orders: [{ order_id: 52, date: "2023-12-28T13:00:00.000Z", totalCost: 18.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.0, quantity: 2 }, { item_name: "Caffè Mocha", price: 5.0, quantity: 1 }] }, { order_id: 53, date: "2024-01-18T14:45:00.000Z", totalCost: 14.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.5, quantity: 3 }, { item_name: "Flat White", price: 4.5, quantity: 1 }] }] },
    { _id: 33, shop_id: 2, user_id: 1, orders: [{ order_id: 79, date: "2023-12-27T09:30:00.000Z", totalCost: 20.0, status: "open", items: [{ item_name: "Espresso", price: 3.0, quantity: 2 }, { item_name: "Caffè Latte", price: 4.0, quantity: 1 }] }, { order_id: 80, date: "2024-01-17T10:45:00.000Z", totalCost: 15.0, status: "open", items: [{ item_name: "Cappuccino", price: 2.5, quantity: 3 }, { item_name: "Mocha", price: 4.5, quantity: 1 }] }] },
    { _id: 34, shop_id: 3, user_id: 2, orders: [{ order_id: 81, date: "2023-12-28T10:00:00.000Z", totalCost: 16.0, status: "open", items: [{ item_name: "Espresso", price: 2.0, quantity: 2 }, { item_name: "Cappuccino", price: 4.0, quantity: 1 }] }, { order_id: 82, date: "2024-01-18T11:30:00.000Z", totalCost: 18.0, status: "open", items: [{ item_name: "Caffè Latte", price: 3.0, quantity: 3 }, { item_name: "Mocha", price: 5.5, quantity: 1 }] }] },
  ]
const items = { 
    "Espresso": 5, 
    "Caffè Latte": 4, 
    "Cappuccino": 7, 
    "Flat White": 4, 
    "Americano": 4, 
    "Mocha": 6, 
    "Iced Coffee": 5, 
    "Irish Coffee": 7, 
    "Macchiato": 5, 
    "Affogato": 5, 
    "Caffè Mocha": 5 
  };
  
  function getRandomDate() {
    const start = new Date('2023-12-23').getTime();
    const end = new Date('2024-02-24').getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
  }
  
  let currentOrderId = 102;

  function getRandomOrder(shop_id, user_id) {
    const orderId = currentOrderId++;
    const date = getRandomDate();
    const orderItems = [];
  
    let totalCost = 0;
  
    const shuffledItems = Object.keys(items).sort(() => Math.random() - 0.5);
  
    const numberOfItems = Math.floor(Math.random() * 2) + 1;
  
    for (let i = 0; i < numberOfItems; i++) {
      const itemName = shuffledItems[i];
      const price = items[itemName];
      const quantity = Math.floor(Math.random() * 2) + 1; 
      const itemCost = price * quantity;
      totalCost += itemCost;
      orderItems.push({ item_name: itemName, price: price, quantity: quantity });
    }
  
    const newOrder = {
      order_id: orderId,
      date: date.toISOString(),
      totalCost: Number(totalCost.toFixed(2)),
      status: "open",
      items: orderItems
    };
  
    const shopIndex = ordersData.findIndex(order => order.shop_id === shop_id && order.user_id === user_id);
    if (shopIndex !== -1) {
      ordersData[shopIndex].orders.push(newOrder);
    } else {
      console.error("Shop ID and User ID pair not found!");
    }
  }

const shopIds = [1, 2, 3, 4];
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < 2000; i++) {
  const randomShopId = shopIds[Math.floor(Math.random() * shopIds.length)];
  const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
  getRandomOrder(randomShopId, randomUserId);
}

// Convert orders array to JSON string
const jsonData = JSON.stringify(ordersData, null, 2);

// Write JSON data to a file
fs.writeFile('random_orders.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Random orders saved to random_orders.json');
    }
});