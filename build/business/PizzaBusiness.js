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
const PizzaDatabase_1 = __importDefault(require("../database/PizzaDatabase"));
const Pizza_1 = __importDefault(require("../model/Pizza"));
const idGenerator_1 = require("../services/idGenerator");
const types_1 = require("../types");
class PizzaBusiness {
    constructor(pizzaDatabase, authenticator, idGenerator, hashManager) {
        this.pizzaDatabase = pizzaDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createPizza = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const description = input.description;
            const status = input.status;
            const token = input.token;
            if (!name || !description) {
                throw new Error("Por favor, preencha o sabor e a descrição da pizza.");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem criar pizzas");
            }
            const id = new idGenerator_1.IdGenerator().generateId();
            const newPizza = new Pizza_1.default(id, name, description, status);
            const pizzaDatabase = new PizzaDatabase_1.default();
            yield pizzaDatabase.createPizza(newPizza);
            const response = {
                message: `Pizza de ${name} criada com sucesso!`,
                id,
            };
            return response;
        });
        this.getPizzas = (input) => __awaiter(this, void 0, void 0, function* () {
            const token = input.token;
            const search = input.search || "";
            const order = input.order || "name";
            const sort = input.sort || "ASC";
            const limit = Number(input.limit) || 10;
            const page = Number(input.page) || 1;
            const offset = limit * (page - 1);
            if (!token) {
                throw new Error("Token faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            const getUsersInputDB = {
                search,
                order,
                sort,
                limit,
                offset,
            };
            const pizzasList = yield this.pizzaDatabase.getPizzas(getUsersInputDB);
            const pizzas = pizzasList.map((pizzaData) => {
                const pizza = new Pizza_1.default(pizzaData.id, pizzaData.name, pizzaData.description, pizzaData.status);
                const userResponse = {
                    id: pizza.getId(),
                    name: pizza.getName(),
                    description: pizza.getDescription(),
                    status: pizza.getStatus(),
                };
                return userResponse;
            });
            const response = {
                pizzas,
            };
            return response;
        });
        this.editPizzaStatus = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, id, name, description, status } = input;
            if (!status) {
                throw new Error("Por favor, insira o status de estoque da pizza.");
            }
            if (status !== types_1.PizzaFlavorStatus.IN_STOCK &&
                status !== types_1.PizzaFlavorStatus.OUT_OF_STOCK) {
                throw new Error("Por favor, insira inStock para pizza em estoque e notInStock para pizza sem estoque.");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem alterar status das pizzas");
            }
            const selectedPizza = yield this.pizzaDatabase.findPizzaById(id);
            if (!selectedPizza) {
                throw new Error("Pizza a ser editada não existe");
            }
            const editedPizza = new Pizza_1.default(selectedPizza.id, selectedPizza.name, selectedPizza.description, selectedPizza.status);
            name && editedPizza.setName(name);
            description && editedPizza.setDescription(description);
            status && editedPizza.setStatus(status);
            yield this.pizzaDatabase.editPizza(editedPizza);
            const response = {
                message: "Edição realizada com sucesso",
            };
            return response;
        });
    }
}
exports.default = PizzaBusiness;
