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
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const User_1 = __importDefault(require("../model/User"));
const authenticator_1 = __importDefault(require("../services/authenticator"));
const hashManager_1 = __importDefault(require("../services/hashManager"));
const idGenerator_1 = require("../services/idGenerator");
class UserBusiness {
    constructor(userDatabase, authenticator, idGenerator, hashManager) {
        this.userDatabase = userDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const email = input.email;
            const whatsapp = input.whatsapp;
            const password = input.password;
            const cep = input.cep;
            const street = input.street;
            const district = input.district;
            const number = input.number;
            const reference = input.reference;
            const role = input.role;
            if (!name ||
                !email ||
                !whatsapp ||
                !password ||
                !cep ||
                !street ||
                !district ||
                !number ||
                !reference) {
                throw new Error("Favor insira todos os dados obrigatórios");
            }
            if (!email.includes("@")) {
                throw new Error("Favor, insira um email válido");
            }
            if (password.lenght < 6) {
                throw new Error("A senha deve ter pelo menos 6 caracteres");
            }
            if (role && role !== "admin" && role !== "normal") {
                throw new Error("Insira o role do user: admin ou normal, deixe vazio para normal");
            }
            const id = new idGenerator_1.IdGenerator().generateId();
            const hashPassword = yield new hashManager_1.default().hash(password);
            const newUser = new User_1.default(id, name, email, whatsapp, hashPassword, cep, street, district, number, reference, role);
            const userDatabase = new UserDatabase_1.default();
            yield userDatabase.createUser(newUser);
            const payload = {
                id: newUser.getId(),
                role: newUser.getRole(),
            };
            const token = new authenticator_1.default().generateToken(payload);
            const response = {
                token,
            };
            return response;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const email = input.email;
            const password = input.password;
            if (!email || !password) {
                throw new Error("Por favor, preencha com e-mail e senha.");
            }
            if (typeof email !== "string" || email.length < 3) {
                throw new Error("Verifique seu e-mail");
            }
            if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                throw new Error("Por favor, insira um e-mail válido");
            }
            if (typeof password !== "string" || password.length < 3) {
                throw new Error("Parâmetro 'password' inválido");
            }
            const userDB = yield this.userDatabase.loginUser(email);
            if (!userDB) {
                throw new Error("E-mail não cadastrado");
            }
            const user = new User_1.default(userDB.id, userDB.name, userDB.email, userDB.whatsapp, userDB.password, userDB.cep, userDB.street, userDB.district, userDB.number, userDB.reference, userDB.role);
            const isPasswordCorrect = yield this.hashManager.compare(password, user.getPassword());
            if (!isPasswordCorrect) {
                throw new Error("Senha incorreta");
            }
            const payload = {
                id: user.getId(),
                role: user.getRole(),
            };
            const token = this.authenticator.generateToken(payload);
            const response = {
                message: "Login realizado com sucesso",
                token,
                user,
            };
            return response;
        });
    }
}
exports.default = UserBusiness;
