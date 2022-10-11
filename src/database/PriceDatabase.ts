import { PizzaTypesAtDatabase } from "../model/Pizza";
import Price, {
  GetPizzaPriceSearch,
  PriceTypeAtDatabase,
} from "../model/Price";
import { PizzaSize } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import PizzaDatabase from "./PizzaDatabase";

export default class PriceDatabase extends BaseDatabase {
  public static PIZZA_PRICES = "pizzaria_precos";
  public static PIZZA_SIZES = "pizzaria_tipos";

  public setPrice = async (price: Price) => {
    const pizzaPrice: PriceTypeAtDatabase = {
      id: price.getId(),
      sabor_id: price.getSabor(),
      tipo_id: price.getTamanho(),
      price: price.getPrice(),
    };
    await BaseDatabase.connections(PriceDatabase.PIZZA_PRICES).insert(
      pizzaPrice
    );
  };
  public selectPizza = async (id: string) => {
    const pizzaAtDb: PizzaTypesAtDatabase[] = await BaseDatabase.connections(
      PizzaDatabase.PIZZA_FLAVORS
    )
      .select()
      .where({ id });

    return pizzaAtDb[0];
  };
  public selectPizzaByPriceId = async (id: string) => {
    const pizzaAtDb: PriceDatabase[] = await BaseDatabase.connections(
      PriceDatabase.PIZZA_PRICES
    )
      .select()
      .where({ id });

    return pizzaAtDb[0];
  };
  public selectSize = async (id: string) => {
    const sizeAtDb: PizzaSize[] = await BaseDatabase.connections(
      PriceDatabase.PIZZA_SIZES
    )
      .select()
      .where({ id });

    return sizeAtDb[0];
  };
  public getPrices = async (input: GetPizzaPriceSearch) => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const pricesAtDB: PriceTypeAtDatabase[] = await BaseDatabase.connections(
      PriceDatabase.PIZZA_PRICES
    )
      .select(
        "pizzaria_precos.id",
        "pizzaria_sabores.name",
        "pizzaria_precos.tipo_id",
        "pizzaria_sabores.description",
        "pizzaria_sabores.status",
        "pizzaria_precos.price"
      )
      .from(PriceDatabase.PIZZA_PRICES)
      .innerJoin(
        PizzaDatabase.PIZZA_FLAVORS,
        "pizzaria_precos.sabor_id",
        "=",
        "pizzaria_sabores.id"
      )
      .orderBy(order, sort)
      .limit(limit)
      .offset(offset);

    return pricesAtDB;
  };
}
