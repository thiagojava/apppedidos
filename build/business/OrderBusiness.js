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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderDatabase_1 = __importDefault(require("../database/OrderDatabase"));
const Order_1 = __importDefault(require("../model/Order"));
const types_1 = require("../types");
class OrderBusiness {
    constructor(orderDatabase, userDatabase, priceDatabase, authenticator, idGenerator, hashManager) {
        this.orderDatabase = orderDatabase;
        this.userDatabase = userDatabase;
        this.priceDatabase = priceDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const id = input.id;
            const client_email = input.client_email;
            const price_id = input.price_id;
            const quantity = input.quantity;
            const orderStatus = input.status;
            const token = input.token;
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (!client_email || !price_id || !quantity) {
                throw new Error("Por favor, preencha os dados do pedido.");
            }
            if (quantity && typeof quantity !== "number") {
                throw new Error("Quantidade aceita apenas números");
            }
            if (orderStatus &&
                orderStatus !== types_1.OrderStatus.DELIVERY &&
                orderStatus !== types_1.OrderStatus.FINALIZADO &&
                orderStatus !== types_1.OrderStatus.PREPARANDO) {
                throw new Error("Por favor, insira inStock para pizza em estoque e notInStock para pizza sem estoque.");
            }
            const priceAtDb = yield this.priceDatabase.selectPizzaByPriceId(price_id);
            if (!priceAtDb) {
                throw new Error("Id do preço da pizza incorreto");
            }
            const userEmail = yield this.userDatabase.loginUser(client_email);
            if (!userEmail) {
                throw new Error("Email do usuário incorreto na requisição");
            }
            if (!id) {
                throw new Error("Insira o id do pedido");
            }
            const newOrder = new Order_1.default(id, client_email, price_id, quantity, orderStatus);
            const orderDatabase = new OrderDatabase_1.default();
            yield orderDatabase.setOrder(newOrder);
            const response = {
                newOrder,
            };
            return response;
        });
        this.getOrderById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, id } = input;
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            const selectedOrder = yield this.orderDatabase.getOrderById(id);
            if (!selectedOrder) {
                throw new Error("Pedido não existe ou incorreto");
            }
            const response = {
                selectedOrder,
            };
            return response;
        });
        this.getOrders = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas ver a lista de pedidos");
            }
            const orderList = yield this.orderDatabase.getOrders();
            const response = {
                orderList,
            };
            return response;
        });
    }
}
exports.default = OrderBusiness;
