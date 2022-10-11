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
const BaseDatabase_1 = require("./BaseDatabase");
const PizzaDatabase_1 = __importDefault(require("./PizzaDatabase"));
const PriceDatabase_1 = __importDefault(require("./PriceDatabase"));
class OrderDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.setOrder = (order) => __awaiter(this, void 0, void 0, function* () {
            const newOrder = {
                id: order.getId(),
                client_email: order.getClientEmail(),
                price_id: order.getPriceId(),
                quantity: order.getQuantity(),
                status: order.getOrderStatus(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(OrderDatabase.ORDERS).insert(newOrder);
        });
        this.getOrderById = (id) => __awaiter(this, void 0, void 0, function* () {
            const checkout = yield BaseDatabase_1.BaseDatabase.connections(OrderDatabase.ORDERS)
                .select("pizzaria_orders.id", "pizzaria_orders.date", "pizzaria_sabores.name", "pizzaria_orders.quantity", "pizzaria_orders.status", "pizzaria_precos.tipo_id", "pizzaria_precos.price")
                .where("pizzaria_orders.id", "=", id)
                .innerJoin(PriceDatabase_1.default.PIZZA_PRICES, "pizzaria_orders.price_id", "=", "pizzaria_precos.id")
                .innerJoin(PizzaDatabase_1.default.PIZZA_FLAVORS, "pizzaria_precos.sabor_id", "=", "pizzaria_sabores.id");
            return checkout;
        });
        this.getOrders = () => __awaiter(this, void 0, void 0, function* () {
            const checkout = yield BaseDatabase_1.BaseDatabase.connections(OrderDatabase.ORDERS)
                .select("pizzaria_orders.id", "pizzaria_orders.date", "pizzaria_sabores.name", "pizzaria_orders.quantity", "pizzaria_precos.tipo_id", "pizzaria_orders.status", "pizzaria_precos.price")
                .from(OrderDatabase.ORDERS)
                .innerJoin(PriceDatabase_1.default.PIZZA_PRICES, "pizzaria_orders.price_id", "=", "pizzaria_precos.id")
                .innerJoin(PizzaDatabase_1.default.PIZZA_FLAVORS, "pizzaria_precos.sabor_id", "=", "pizzaria_sabores.id");
            return checkout;
        });
    }
}
exports.default = OrderDatabase;
OrderDatabase.ORDERS = "pizzaria_orders";
// SELECT pizzaria_orders.id, pizzaria_sabores.name ,pizzaria_orders.quantity, pizzaria_precos.tipo_id,pizzaria_precos.price
// FROM pizzaria_orders
// INNER JOIN pizzaria_precos
// ON pizzaria_orders.price_id = pizzaria_precos.id
// INNER JOIN pizzaria_sabores
// ON pizzaria_precos.sabor_id = pizzaria_sabores.id;
