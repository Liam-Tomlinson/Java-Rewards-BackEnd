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
exports.connectDatabase = exports.client = void 0;
const mongodb_1 = require("mongodb");
exports.client = new mongodb_1.MongoClient("mongodb://localhost:27017/javarewards_test");
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        return exports.client.db();
    }
    catch (error) {
        console.error('Could not connect to the database', error);
        process.exit(1);
    }
});
exports.connectDatabase = connectDatabase;
