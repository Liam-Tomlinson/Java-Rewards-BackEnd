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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.fetchUsers = void 0;
const dbConnection_1 = require("../dbConnection");
let db;
(0, dbConnection_1.connectDatabase)().then((database) => {
    db = database;
});
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.collection("Users").find({}).toArray();
    return users;
});
exports.fetchUsers = fetchUsers;
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield db.collection("Users").insertOne({
            name: user.name,
            age: user.age,
            email: user.email,
            avatar_url: user.avatar_url,
            coffee_count: 0,
        });
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
exports.insertUser = insertUser;
