var fs = require('fs');
var ordersData = [
    { _id: 1, shop_id: 3, user_id: 4, orders: [] },
    { _id: 2, shop_id: 4, user_id: 5, orders: [] },
    { _id: 3, shop_id: 2, user_id: 6, orders: [] },
    { _id: 4, shop_id: 3, user_id: 7, orders: [] },
    { _id: 5, shop_id: 4, user_id: 8, orders: [] },
    { _id: 6, shop_id: 1, user_id: 9, orders: [] },
    { _id: 7, shop_id: 2, user_id: 10, orders: [] },
    { _id: 8, shop_id: 3, user_id: 6, orders: [] },
    { _id: 9, shop_id: 4, user_id: 7, orders: [] },
    { _id: 10, shop_id: 1, user_id: 8, orders: [] },
    { _id: 11, shop_id: 2, user_id: 9, orders: [] },
    { _id: 12, shop_id: 3, user_id: 10, orders: [] },
    { _id: 35, shop_id: 1, user_id: 1, orders: [] },
    { _id: 21, shop_id: 4, user_id: 3, orders: [] },
    { _id: 22, shop_id: 1, user_id: 4, orders: [] },
    { _id: 33, shop_id: 2, user_id: 1, orders: [] },
    { _id: 34, shop_id: 3, user_id: 2, orders: [] },
];
var items = {
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
    var start = new Date('2023-12-01').getTime();
    var end = new Date('2024-02-28').getTime();
    var randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
}
var currentOrderId = 102;
function getRandomOrder(shop_id, user_id) {
    var orderId = currentOrderId++;
    var date = getRandomDate();
    var orderItems = [];
    var totalCost = 0;
    var shuffledItems = Object.keys(items).sort(function () { return Math.random() - 0.5; });
    var numberOfItems = Math.floor(Math.random() * 2) + 1;
    for (var i = 0; i < numberOfItems; i++) {
        var itemName = shuffledItems[i];
        var price = items[itemName];
        var quantity = Math.floor(Math.random() * 2) + 1;
        var itemCost = price * quantity;
        totalCost += itemCost;
        var order = { item_name: itemName, price: price, quantity: quantity };
        orderItems.push(order);
    }
    var newOrder = {
        order_id: orderId,
        date: date.toISOString(),
        totalCost: Number(totalCost.toFixed(2)),
        status: "open",
        items: orderItems
    };
    var shopIndex = ordersData.findIndex(function (order) { return order.shop_id === shop_id && order.user_id === user_id; });
    if (shopIndex !== -1) {
        ordersData[shopIndex].orders.push(newOrder);
    }
    else {
        console.error("Shop ID and User ID pair not found!");
    }
}
var shopIds = [1, 2, 3, 4];
var userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var i = 0; i < 2000; i++) {
    var randomShopId = shopIds[Math.floor(Math.random() * shopIds.length)];
    var randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    getRandomOrder(randomShopId, randomUserId);
}
var jsonData = JSON.stringify(ordersData, null, 2);
fs.writeFile('random_orders.json', jsonData, 'utf8', function (err) {
    if (err) {
        console.error('Error writing to file:', err);
    }
    else {
        console.log('Random orders saved to random_orders.json');
    }
});
