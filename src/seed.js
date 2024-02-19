"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateTestData = void 0;
var dbConnection_1 = require("./dbConnection");
var populateTestData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, shops, users, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, dbConnection_1.connectDatabase)()];
            case 1:
                db = _a.sent();
                console.log("Dropping database...");
                return [4 /*yield*/, db.dropDatabase()];
            case 2:
                _a.sent();
                shops = db.collection("CoffeeShops");
                users = db.collection("Users");
                orders = db.collection("Orders");
                db.collection("CoffeeShops").createIndex({ name: 1 }, { unique: true });
                console.log("Seeding database ".concat(db.databaseName, " , collection ").concat(shops.collectionName, "..."));
                return [4 /*yield*/, shops.insertMany(shopData)];
            case 3:
                _a.sent();
                console.log("Seeding database ".concat(db.databaseName, " , collection ").concat(users.collectionName, "..."));
                return [4 /*yield*/, users.insertMany(userData)];
            case 4:
                _a.sent();
                console.log("Seeding database ".concat(db.databaseName, " , collection ").concat(orders.collectionName, "..."));
                return [4 /*yield*/, orders.insertMany(ordersData)];
            case 5:
                _a.sent();
                console.log("Test data has been populated.");
                return [2 /*return*/];
        }
    });
}); };
exports.populateTestData = populateTestData;
// populateTestData().then(() => client.close());
var shopData = [
    {
        shop_id: 1,
        name: "Mancunian Brew",
        email: "mancunianbrew@example.com",
        avatar_url: "http://example.com/mancunian_brew_avatar.jpg",
        location: {
            lat: 53.483959,
            long: -2.244644,
        },
        description: "A cozy coffee shop serving locally roasted coffee.",
        totalRating: {
            count: 120,
            rating: 4.5,
        },
        menu: [
            {
                item: "Espresso",
                cost: 2.5,
                description: "A shot of intense coffee.",
                item_img: "http://example.com/espresso.jpg",
            },
            {
                item: "Latte",
                cost: 3.5,
                description: "Coffee with steamed milk.",
                item_img: "http://example.com/latte.jpg",
            },
            {
                item: "Croissant",
                cost: 2.0,
                description: "Freshly baked pastry.",
                item_img: "http://example.com/croissant.jpg",
            },
        ],
        offers: {
            img: "http://example.com/offers.jpg",
            description: "Buy one get one free on all pastries!",
            date: "2024-02-20",
        },
    },
    {
        shop_id: 2,
        name: "Northern Roast",
        email: "northernroast@example.com",
        avatar_url: "http://example.com/northern_roast_avatar.jpg",
        location: {
            lat: 53.474688,
            long: -2.249487,
        },
        description: "Specialty coffee and artisan pastries.",
        totalRating: {
            count: 90,
            rating: 4.2,
        },
        menu: [
            {
                item: "Cappuccino",
                cost: 3.0,
                description: "Coffee with equal parts steamed milk and milk froth.",
                item_img: "http://example.com/cappuccino.jpg",
            },
            {
                item: "Muffin",
                cost: 2.5,
                description: "Freshly baked muffin.",
                item_img: "http://example.com/muffin.jpg",
            },
            {
                item: "Flat White",
                cost: 3.5,
                description: "Espresso with velvety steamed milk.",
                item_img: "http://example.com/flat_white.jpg",
            },
        ],
        offers: {
            img: "http://example.com/offers2.jpg",
            description: "10% off on all coffee beans!",
            date: "2024-02-21",
        },
    },
    {
        shop_id: 3,
        name: "City Grind",
        email: "citygrind@example.com",
        avatar_url: "http://example.com/city_grind_avatar.jpg",
        location: {
            lat: 53.479609,
            long: -2.243708,
        },
        description: "Modern coffee spot with a variety of brews.",
        totalRating: {
            count: 150,
            rating: 4.6,
        },
        menu: [
            {
                item: "Filter Coffee",
                cost: 3.5,
                description: "Rich and smooth brewed coffee.",
                item_img: "http://example.com/filter_coffee.jpg",
            },
            {
                item: "Bagel",
                cost: 4.0,
                description: "Freshly baked bagel with cream cheese.",
                item_img: "http://example.com/bagel.jpg",
            },
            {
                item: "Iced Latte",
                cost: 4.5,
                description: "Chilled espresso with milk and ice.",
                item_img: "http://example.com/iced_latte.jpg",
            },
        ],
        offers: {
            img: "http://example.com/offers3.jpg",
            description: "Free pastry with any large coffee purchase!",
            date: "2024-02-22",
        },
    },
    {
        shop_id: 4,
        name: "Manchester Mugs",
        email: "manchestermugs@example.com",
        avatar_url: "http://example.com/manchester_mugs_avatar.jpg",
        location: {
            lat: 53.476319,
            long: -2.23928,
        },
        description: "Quaint café serving freshly brewed coffee.",
        totalRating: {
            count: 80,
            rating: 4.0,
        },
        menu: [
            {
                item: "Americano",
                cost: 3.0,
                description: "Espresso with hot water.",
                item_img: "http://example.com/americano.jpg",
            },
            {
                item: "Scone",
                cost: 2.5,
                description: "Traditional British pastry.",
                item_img: "http://example.com/scone.jpg",
            },
            {
                item: "Mocha",
                cost: 4.0,
                description: "Espresso with steamed milk and chocolate.",
                item_img: "http://example.com/mocha.jpg",
            },
        ],
        offers: {
            img: "http://example.com/offers4.jpg",
            description: "Half-price on all hot drinks from 3 PM to 5 PM!",
            date: "2024-02-23",
        },
    },
];
var userData = [
    {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        avatar_url: "http://example.com/avatar1.jpg",
        coffee_count: 20,
    },
    {
        name: "Jane Smith",
        age: 25,
        email: "jane@example.com",
        avatar_url: "http://example.com/avatar2.jpg",
        coffee_count: 15,
    },
    {
        name: "Michael Johnson",
        age: 40,
        email: "michael@example.com",
        avatar_url: "http://example.com/avatar3.jpg",
        coffee_count: 10,
    },
    {
        name: "Emily Davis",
        age: 35,
        email: "emily@example.com",
        avatar_url: "http://example.com/avatar4.jpg",
        coffee_count: 25,
    },
    {
        name: "David Brown",
        age: 28,
        email: "david@example.com",
        avatar_url: "http://example.com/avatar5.jpg",
        coffee_count: 18,
    },
    {
        name: "Sarah Wilson",
        age: 45,
        email: "sarah@example.com",
        avatar_url: "http://example.com/avatar6.jpg",
        coffee_count: 12,
    },
    {
        name: "Chris Lee",
        age: 27,
        email: "chris@example.com",
        avatar_url: "http://example.com/avatar7.jpg",
        coffee_count: 30,
    },
    {
        name: "Jessica Taylor",
        age: 32,
        email: "jessica@example.com",
        avatar_url: "http://example.com/avatar8.jpg",
        coffee_count: 22,
    },
    {
        name: "Ryan Martinez",
        age: 38,
        email: "ryan@example.com",
        avatar_url: "http://example.com/avatar9.jpg",
        coffee_count: 17,
    },
    {
        name: "Amanda Anderson",
        age: 29,
        email: "amanda@example.com",
        avatar_url: "http://example.com/avatar10.jpg",
        coffee_count: 21,
    },
];
var ordersData = [
    {
        shop_id: 1,
        user_id: 101,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 15.5,
                status: "open",
                items: [
                    {
                        item_name: "Espresso",
                        price: 2.5,
                        quantity: 2,
                    },
                    {
                        item_name: "Latte",
                        price: 4.0,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 102,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 18.0,
                status: "open",
                items: [
                    {
                        item_name: "Cappuccino",
                        price: 3.5,
                        quantity: 2,
                    },
                    {
                        item_name: "Croissant",
                        price: 2.5,
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 103,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 10.0,
                status: "open",
                items: [
                    {
                        item_name: "Flat White",
                        price: 3.5,
                        quantity: 1,
                    },
                    {
                        item_name: "Muffin",
                        price: 2.5,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 104,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 8.0,
                status: "open",
                items: [
                    {
                        item_name: "Americano",
                        price: 3.0,
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 105,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 12.5,
                status: "open",
                items: [
                    {
                        item_name: "Cortado",
                        price: 3.5,
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 106,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 9.0,
                status: "open",
                items: [
                    {
                        item_name: "Turkish Coffee",
                        price: 4.0,
                        quantity: 1,
                    },
                    {
                        item_name: "Scone",
                        price: 2.0,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 107,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 7.0,
                status: "open",
                items: [
                    {
                        item_name: "Macchiato",
                        price: 3.5,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 108,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 13.0,
                status: "open",
                items: [
                    {
                        item_name: "Iced Latte",
                        price: 4.5,
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 109,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 20.0,
                status: "open",
                items: [
                    {
                        item_name: "Affogato",
                        price: 5.0,
                        quantity: 2,
                    },
                ],
            },
        ],
    },
    {
        shop_id: 1,
        user_id: 110,
        orders: [
            {
                date: "2024-02-19",
                totalCost: 11.0,
                status: "open",
                items: [
                    {
                        item_name: "Chai Latte",
                        price: 4.0,
                        quantity: 1,
                    },
                    {
                        item_name: "Bagel",
                        price: 3.0,
                        quantity: 1,
                    },
                ],
            },
        ],
    },
];
