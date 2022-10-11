import { Router } from "express";
import PriceBusiness from "../business/PriceBusiness";
import { PriceController } from "../controller/PriceController";
import PriceDatabase from "../database/PriceDatabase";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";

export const priceRouter = Router();

const priceController = new PriceController(
  new PriceBusiness(
    new PriceDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

priceRouter.post("/setPrice", priceController.setPizzaPrice);
priceRouter.get("/pizzaPrices", priceController.getPizzasPrices);
