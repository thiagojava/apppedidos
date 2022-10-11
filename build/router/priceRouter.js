"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceRouter = void 0;
const express_1 = require("express");
const PriceBusiness_1 = __importDefault(require("../business/PriceBusiness"));
const PriceController_1 = require("../controller/PriceController");
const PriceDatabase_1 = __importDefault(require("../database/PriceDatabase"));
const authenticator_1 = __importDefault(require("../services/authenticator"));
const hashManager_1 = __importDefault(require("../services/hashManager"));
const idGenerator_1 = require("../services/idGenerator");
exports.priceRouter = (0, express_1.Router)();
const priceController = new PriceController_1.PriceController(new PriceBusiness_1.default(new PriceDatabase_1.default(), new authenticator_1.default(), new idGenerator_1.IdGenerator(), new hashManager_1.default()));
exports.priceRouter.post("/setPrice", priceController.setPizzaPrice);
exports.priceRouter.get("/pizzaPrices", priceController.getPizzasPrices);
