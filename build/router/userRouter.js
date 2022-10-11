"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const authenticator_1 = __importDefault(require("../services/authenticator"));
const hashManager_1 = __importDefault(require("../services/hashManager"));
const idGenerator_1 = require("../services/idGenerator");
exports.userRouter = (0, express_1.Router)();
const userController = new UserController_1.default(new UserBusiness_1.default(new UserDatabase_1.default(), new authenticator_1.default(), new idGenerator_1.IdGenerator(), new hashManager_1.default()));
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/login", userController.login);
