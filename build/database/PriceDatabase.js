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
class PriceDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.setPrice = (price) => __awaiter(this, void 0, void 0, function* () {
            const pizzaPrice = {
                id: price.getId(),
                sabor_id: price.getSabor(),
                tipo_id: price.getTamanho(),
                price: price.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PriceDatabase.PIZZA_PRICES).insert(pizzaPrice);
        });
        this.selectPizza = (id) => __awaiter(this, void 0, void 0, function* () {
            const pizzaAtDb = yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase_1.default.PIZZA_FLAVORS)
                .select()
                .where({ id });
            return pizzaAtDb[0];
        });
        this.selectPizzaByPriceId = (id) => __awaiter(this, void 0, void 0, function* () {
            const pizzaAtDb = yield BaseDatabase_1.BaseDatabase.connections(PriceDatabase.PIZZA_PRICES)
                .select()
                .where({ id });
            return pizzaAtDb[0];
        });
        this.selectSize = (id) => __awaiter(this, void 0, void 0, function* () {
            const sizeAtDb = yield BaseDatabase_1.BaseDatabase.connections(PriceDatabase.PIZZA_SIZES)
                .select()
                .where({ id });
            return sizeAtDb[0];
        });
        this.getPrices = (input) => __awaiter(this, void 0, void 0, function* () {
            const search = input.search;
            const order = input.order;
            const sort = input.sort;
            const limit = input.limit;
            const offset = input.offset;
            const pricesAtDB = yield BaseDatabase_1.BaseDatabase.connections(PriceDatabase.PIZZA_PRICES)
                .select("pizzaria_precos.id", "pizzaria_sabores.name", "pizzaria_precos.tipo_id", "pizzaria_sabores.description", "pizzaria_sabores.status", "pizzaria_precos.price")
                .from(PriceDatabase.PIZZA_PRICES)
                .innerJoin(PizzaDatabase_1.default.PIZZA_FLAVORS, "pizzaria_precos.sabor_id", "=", "pizzaria_sabores.id")
                .orderBy(order, sort)
                .limit(limit)
                .offset(offset);
            return pricesAtDB;
        });
    }
}
exports.default = PriceDatabase;
PriceDatabase.PIZZA_PRICES = "pizzaria_precos";
PriceDatabase.PIZZA_SIZES = "pizzaria_tipos";
