import PizzaDatabase from "../database/PizzaDatabase";
import Pizza, {
  GetPizzas,
  GetPizzasSearch,
  PizzaTypesAtDatabase,
} from "../model/Pizza";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { PizzaFlavorStatus, UserRole } from "../types";

export default class PizzaBusiness {
  constructor(
    protected pizzaDatabase: PizzaDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public createPizza = async (input: any) => {
    const name = input.name;
    const description = input.description;
    const status = input.status;
    const token = input.token;

    if (!name || !description) {
      throw new Error("Por favor, preencha o sabor e a descrição da pizza.");
    }
    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem criar pizzas");
    }

    const id = new IdGenerator().generateId();

    const newPizza = new Pizza(id, name, description, status);

    const pizzaDatabase = new PizzaDatabase();
    await pizzaDatabase.createPizza(newPizza);

    const response = {
      message: `Pizza de ${name} criada com sucesso!`,
      id,
    };

    return response;
  };

  public getPizzas = async (input: GetPizzas) => {
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

    const getUsersInputDB: GetPizzasSearch = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const pizzasList = await this.pizzaDatabase.getPizzas(getUsersInputDB);

    const pizzas = pizzasList.map((pizzaData: PizzaTypesAtDatabase) => {
      const pizza = new Pizza(
        pizzaData.id,
        pizzaData.name,
        pizzaData.description,
        pizzaData.status
      );

      const userResponse: any = {
        id: pizza.getId(),
        name: pizza.getName(),
        description: pizza.getDescription(),
        status: pizza.getStatus(),
      };

      return userResponse;
    });

    const response: any = {
      pizzas,
    };

    return response;
  };

  public editPizzaStatus = async (input: any) => {
    const { token, id, name, description, status } = input;

    if (!status) {
      throw new Error("Por favor, insira o status de estoque da pizza.");
    }
    if (
      status !== PizzaFlavorStatus.IN_STOCK &&
      status !== PizzaFlavorStatus.OUT_OF_STOCK
    ) {
      throw new Error(
        "Por favor, insira inStock para pizza em estoque e notInStock para pizza sem estoque."
      );
    }
    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem alterar status das pizzas");
    }

    const selectedPizza = await this.pizzaDatabase.findPizzaById(id);

    if (!selectedPizza) {
      throw new Error("Pizza a ser editada não existe");
    }

    const editedPizza = new Pizza(
      selectedPizza.id,
      selectedPizza.name,
      selectedPizza.description,
      selectedPizza.status
    );

    name && editedPizza.setName(name);
    description && editedPizza.setDescription(description);
    status && editedPizza.setStatus(status);

    await this.pizzaDatabase.editPizza(editedPizza);

    const response = {
      message: "Edição realizada com sucesso",
    };

    return response;
  };
}
