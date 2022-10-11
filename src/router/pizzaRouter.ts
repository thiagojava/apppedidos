import { Router } from "express";
import PizzaBusiness from "../business/PizzaBusiness";
import { PizzaController } from "../controller/PizzaController";
import PizzaDatabase from "../database/PizzaDatabase";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";

export const pizzaRouter = Router();

const pizzaController = new PizzaController(
  new PizzaBusiness(
    new PizzaDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

pizzaRouter.post("/createPizza", pizzaController.createPizza);
pizzaRouter.put("/:id", pizzaController.editPizza);
pizzaRouter.get("/", pizzaController.getPizzas);
