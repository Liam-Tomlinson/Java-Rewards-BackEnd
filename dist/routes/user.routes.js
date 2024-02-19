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
exports.router = void 0;
const express_1 = require("express");
const dbConnection_1 = require("../dbConnection");
const users_controllers_1 = require("../controllers/users-controllers");
const router = (0, express_1.Router)();
exports.router = router;
let db;
(0, dbConnection_1.connectDatabase)().then((database) => {
    db = database;
});
router.get("/", users_controllers_1.getUsers);
router.get("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const user = yield db
            .collection("Users")
            .find({ user_id: user_id })
            .toArray();
        res.status(200).send({ user });
    }
    catch (err) {
        res
            .status(500)
            .send({ message: "An error occurred while fetching a user by id." });
    }
}));
router.post("/", users_controllers_1.postUser);
