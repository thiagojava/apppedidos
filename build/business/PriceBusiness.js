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
const PriceDatabase_1 = __importDefault(require("../database/PriceDatabase"));
const Price_1 = __importDefault(require("../model/Price"));
const idGenerator_1 = require("../services/idGenerator");
const types_1 = require("../types");
class PriceBusiness {
    constructor(priceDatabase, authenticator, idGenerator, hashManager) {
        this.priceDatabase = priceDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.setPrice = (input) => __awaiter(this, void 0, void 0, function* () {
            const sabor_id = input.sabor_id;
            const tipo_id = input.tipo_id;
            const price = input.price;
            const token = input.token;
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem altera o preço das pizzas");
            }
            if (!sabor_id || !tipo_id) {
                throw new Error("Preencha os IDs do sabor e o tamanho para alterar o preço");
            }
            if (!Object.values(types_1.PizzaSize).includes(tipo_id)) {
                throw new Error("Tamanho de pizza inválido");
            }
            if (!price) {
                throw new Error("Insira o preço da pizza");
            }
            const pizzaAtDb = yield this.priceDatabase.selectPizza(sabor_id);
            if (!pizzaAtDb) {
                throw new Error("Id da Pizza incorreto");
            }
            const sizeAtDb = yield this.priceDatabase.selectSize(tipo_id);
            if (!sizeAtDb) {
                throw new Error("Id do tamanho incorreto");
            }
            const id = new idGenerator_1.IdGenerator().generateId();
            const pizzaPrice = new Price_1.default(id, sabor_id, tipo_id, price);
            const priceDatabase = new PriceDatabase_1.default();
            yield priceDatabase.setPrice(pizzaPrice);
            const response = {
                message: `Preço da pizza ${pizzaAtDb.name} no tamanho ${tipo_id} agora é ${price}`,
            };
            return response;
        });
        this.getPizzaPrice = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const getPricesInput = {
                search,
                order,
                sort,
                limit,
                offset,
            };
            const pricesList = yield this.priceDatabase.getPrices(getPricesInput);
            const response = {
                pricesList,
            };
            return response;
        });
    }
}
exports.default = PriceBusiness;
