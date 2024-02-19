"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_routes_1.router);
app.all("/*", (req, res, next) => {
    res.status(400).send("Bad Request");
});
app.use((err, req, res, next) => {
    if (err.code === 11000) {
        res.status(400).send(err);
    }
    else {
        res.status(500).send("internal server error");
    }
});
exports.default = app;
