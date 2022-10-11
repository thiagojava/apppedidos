import { Router } from "express";
import UserBusiness from "../business/UserBusiness";
import UserController from "../controller/UserController";
import UserDatabase from "../database/UserDatabase";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";

export const userRouter = Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
