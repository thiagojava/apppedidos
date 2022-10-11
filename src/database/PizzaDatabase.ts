import Pizza, { GetPizzasSearch, PizzaTypesAtDatabase } from "../model/Pizza";
import { BaseDatabase } from "./BaseDatabase";

export default class PizzaDatabase extends BaseDatabase {
  public static PIZZA_FLAVORS = "pizzaria_sabores";

  public createPizza = async (pizza: Pizza) => {
    const newPizza: PizzaTypesAtDatabase = {
      id: pizza.getId(),
      name: pizza.getName(),
      description: pizza.getDescription(),
      status: pizza.getStatus(),
    };
    await BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS).insert(
      newPizza
    );
  };
  public getPizzas = async (input: GetPizzasSearch) => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const usersDB: PizzaTypesAtDatabase[] = await BaseDatabase.connections(
      PizzaDatabase.PIZZA_FLAVORS
    )
      .select()
      .where("name", "LIKE", `%${search}%`)
      .orderBy(order, sort)
      .limit(limit)
      .offset(offset);

    return usersDB;
  };
  public findPizzaById = async (id: string) => {
    const editedPizza: PizzaTypesAtDatabase[] = await BaseDatabase.connections(
      PizzaDatabase.PIZZA_FLAVORS
    )
      .select()
      .where({ id });

    return editedPizza[0];
  };
  public editPizza = async (pizza: Pizza) => {
    const updatedPizza: PizzaTypesAtDatabase = {
      id: pizza.getId(),
      name: pizza.getName(),
      description: pizza.getDescription(),
      status: pizza.getStatus(),
    };

    await BaseDatabase.connections(PizzaDatabase.PIZZA_FLAVORS)
      .update(updatedPizza)
      .where({ id: updatedPizza.id });
  };
}
