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
const BaseDatabase_1 = require("./BaseDatabase");
class PizzaDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createPizza = (pizza) => __awaiter(this, void 0, void 0, function* () {
            const newPizza = {
                id: pizza.getId(),
                name: pizza.getName(),
                description: pizza.getDescription(),
                status: pizza.getStatus(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS).insert(newPizza);
        });
        this.getPizzas = (input) => __awaiter(this, void 0, void 0, function* () {
            const search = input.search;
            const order = input.order;
            const sort = input.sort;
            const limit = input.limit;
            const offset = input.offset;
            const usersDB = yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS)
                .select()
                .where("name", "LIKE", `%${search}%`)
                .orderBy(order, sort)
                .limit(limit)
                .offset(offset);
            return usersDB;
        });
        this.findPizzaById = (id) => __awaiter(this, void 0, void 0, function* () {
            const editedPizza = yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS)
                .select()
                .where({ id });
            return editedPizza[0];
        });
        this.editPizza = (pizza) => __awaiter(this, void 0, void 0, function* () {
            const updatedPizza = {
                id: pizza.getId(),
                name: pizza.getName(),
                description: pizza.getDescription(),
                status: pizza.getStatus(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS)
                .update(updatedPizza)
                .where({ id: updatedPizza.id });
        });
    }
}
exports.default = PizzaDatabase;
PizzaDatabase.PIZZA_FLAVORS = "pizzaria_sabores";
