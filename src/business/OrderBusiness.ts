import OrderDatabase from "../database/OrderDatabase";
import PriceDatabase from "../database/PriceDatabase";
import UserDatabase from "../database/UserDatabase";
import Order, { GetOrderSearch } from "../model/Order";
import Authenticator from "../services/authenticator";
import HashManager from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { OrderStatus, UserRole } from "../types";

export default class OrderBusiness {
  constructor(
    protected orderDatabase: OrderDatabase,
    protected userDatabase: UserDatabase,
    protected priceDatabase: PriceDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public createOrder = async (input: any) => {
    const id = input.id;
    const client_email = input.client_email;
    const price_id = input.price_id;
    const quantity = input.quantity;
    const orderStatus = input.status;
    const token = input.token;

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (!client_email || !price_id || !quantity) {
      throw new Error("Por favor, preencha os dados do pedido.");
    }

    if (quantity && typeof quantity !== "number") {
      throw new Error("Quantidade aceita apenas números");
    }

    if (
      orderStatus &&
      orderStatus !== OrderStatus.DELIVERY &&
      orderStatus !== OrderStatus.FINALIZADO &&
      orderStatus !== OrderStatus.PREPARANDO
    ) {
      throw new Error(
        "Por favor, insira inStock para pizza em estoque e notInStock para pizza sem estoque."
      );
    }

    const priceAtDb = await this.priceDatabase.selectPizzaByPriceId(price_id);

    if (!priceAtDb) {
      throw new Error("Id do preço da pizza incorreto");
    }

    const userEmail = await this.userDatabase.loginUser(client_email);

    if (!userEmail) {
      throw new Error("Email do usuário incorreto na requisição");
    }
    if (!id) {
      throw new Error("Insira o id do pedido");
    }

    const newOrder = new Order(
      id,
      client_email,
      price_id,
      quantity,
      orderStatus
    );

    const orderDatabase = new OrderDatabase();
    await orderDatabase.setOrder(newOrder);

    const response = {
      newOrder,
    };

    return response;
  };
  public getOrderById = async (input: any) => {
    const { token, id } = input;

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    const selectedOrder = await this.orderDatabase.getOrderById(id);

    if (!selectedOrder) {
      throw new Error("Pedido não existe ou incorreto");
    }

    const response = {
      selectedOrder,
    };

    return response;
  };
  public getOrders = async (input: any) => {
    const { token } = input;

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas ver a lista de pedidos");
    }

    const orderList = await this.orderDatabase.getOrders();

    const response = {
      orderList,
    };

    return response;
  };
}
