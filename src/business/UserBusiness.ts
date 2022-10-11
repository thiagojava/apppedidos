import UserDatabase from "../database/UserDatabase";
import User from "../model/User";
import Authenticator, { authenticationData } from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";

export default class UserBusiness {
  constructor(
    protected userDatabase: UserDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}

  public signup = async (input: any) => {
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
    if (
      !name ||
      !email ||
      !whatsapp ||
      !password ||
      !cep ||
      !street ||
      !district ||
      !number ||
      !reference
    ) {
      throw new Error("Favor insira todos os dados obrigatórios");
    }
    if (!email.includes("@")) {
      throw new Error("Favor, insira um email válido");
    }
    if (password.lenght < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }
    if (role && role !== "admin" && role !== "normal") {
      throw new Error(
        "Insira o role do user: admin ou normal, deixe vazio para normal"
      );
    }

    const id = new IdGenerator().generateId();
    const hashPassword = await new HashManager().hash(password);

    const newUser = new User(
      id,
      name,
      email,
      whatsapp,
      hashPassword,
      cep,
      street,
      district,
      number,
      reference,
      role
    );

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(newUser);

    const payload: authenticationData = {
      id: newUser.getId(),
      role: newUser.getRole(),
    };

    const token = new Authenticator().generateToken(payload);

    const response = {
      token,
    };

    return response;
  };

  public login = async (input: any) => {
    const email = input.email;
    const password = input.password;

    if (!email || !password) {
      throw new Error("Por favor, preencha com e-mail e senha.");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new Error("Verifique seu e-mail");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new Error("Por favor, insira um e-mail válido");
    }

    if (typeof password !== "string" || password.length < 3) {
      throw new Error("Parâmetro 'password' inválido");
    }

    const userDB = await this.userDatabase.loginUser(email);

    if (!userDB) {
      throw new Error("E-mail não cadastrado");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.whatsapp,
      userDB.password,
      userDB.cep,
      userDB.street,
      userDB.district,
      userDB.number,
      userDB.reference,
      userDB.role
    );

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new Error("Senha incorreta");
    }

    const payload: authenticationData = {
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
  };
}
