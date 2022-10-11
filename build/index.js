"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./router/userRouter");
const pizzaRouter_1 = require("./router/pizzaRouter");
const priceRouter_1 = require("./router/priceRouter");
const OrderRouter_1 = require("./router/OrderRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log("Servidor rodando na porta 3003");
});
exports.default = app;
app.use("/", userRouter_1.userRouter);
app.use("/", pizzaRouter_1.pizzaRouter);
app.use("/", priceRouter_1.priceRouter);
app.use("/", OrderRouter_1.orderRouter);
