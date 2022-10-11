import PriceDatabase from "../database/PriceDatabase";
import Price, { GetPizzaPrice, GetPizzaPriceSearch } from "../model/Price";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { PizzaSize, UserRole } from "../types";

export default class PriceBusiness {
  constructor(
    protected priceDatabase: PriceDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public setPrice = async (input: any) => {
    const sabor_id = input.sabor_id;
    const tipo_id = input.tipo_id;
    const price = input.price;
    const token = input.token;

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem altera o preço das pizzas");
    }

    if (!sabor_id || !tipo_id) {
      throw new Error(
        "Preencha os IDs do sabor e o tamanho para alterar o preço"
      );
    }

    if (!Object.values(PizzaSize).includes(tipo_id)) {
      throw new Error("Tamanho de pizza inválido");
    }

    if (!price) {
      throw new Error("Insira o preço da pizza");
    }

    const pizzaAtDb = await this.priceDatabase.selectPizza(sabor_id);

    if (!pizzaAtDb) {
      throw new Error("Id da Pizza incorreto");
    }

    const sizeAtDb = await this.priceDatabase.selectSize(tipo_id);

    if (!sizeAtDb) {
      throw new Error("Id do tamanho incorreto");
    }

    const id = new IdGenerator().generateId();

    const pizzaPrice = new Price(id, sabor_id, tipo_id, price);

    const priceDatabase = new PriceDatabase();
    await priceDatabase.setPrice(pizzaPrice);

    const response = {
      message: `Preço da pizza ${pizzaAtDb.name} no tamanho ${tipo_id} agora é ${price}`,
    };

    return response;
  };
  public getPizzaPrice = async (input: GetPizzaPrice) => {
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

    const getPricesInput: GetPizzaPriceSearch = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const pricesList = await this.priceDatabase.getPrices(getPricesInput);

    const response: any = {
      pricesList,
    };

    return response;
  };
}
