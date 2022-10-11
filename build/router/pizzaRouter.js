"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pizzaRouter = void 0;
const express_1 = require("express");
const PizzaBusiness_1 = __importDefault(require("../business/PizzaBusiness"));
const PizzaController_1 = require("../controller/PizzaController");
const PizzaDatabase_1 = __importDefault(require("../database/PizzaDatabase"));
const authenticator_1 = __importDefault(require("../services/authenticator"));
const hashManager_1 = __importDefault(require("../services/hashManager"));
const idGenerator_1 = require("../services/idGenerator");
exports.pizzaRouter = (0, express_1.Router)();
const pizzaController = new PizzaController_1.PizzaController(new PizzaBusiness_1.default(new PizzaDatabase_1.default(), new authenticator_1.default(), new idGenerator_1.IdGenerator(), new hashManager_1.default()));
exports.pizzaRouter.post("/createPizza", pizzaController.createPizza);
exports.pizzaRouter.put("/:id", pizzaController.editPizza);
exports.pizzaRouter.get("/", pizzaController.getPizzas);
