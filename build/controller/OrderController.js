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
exports.OrderController = void 0;
class OrderController {
    constructor(orderBusiness) {
        this.orderBusiness = orderBusiness;
        this.newOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.body.id,
                    client_email: req.body.client_email,
                    price_id: req.body.price_id,
                    quantity: req.body.quantity,
                    status: req.body.status,
                };
                const response = yield this.orderBusiness.createOrder(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id,
                };
                const response = yield this.orderBusiness.getOrderById(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                };
                const response = yield this.orderBusiness.getOrders(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
    }
}
exports.OrderController = OrderController;
