import Order, { OrderTypeAtDatabase } from "../model/Order";
import { BaseDatabase } from "./BaseDatabase";
import PizzaDatabase from "./PizzaDatabase";
import PriceDatabase from "./PriceDatabase";

export default class OrderDatabase extends BaseDatabase {
  public static ORDERS = "pizzaria_orders";

  public setOrder = async (order: Order) => {
    const newOrder: OrderTypeAtDatabase = {
      id: order.getId(),
      client_email: order.getClientEmail(),
      price_id: order.getPriceId(),
      quantity: order.getQuantity(),
      status: order.getOrderStatus(),
    };
    await BaseDatabase.connections(OrderDatabase.ORDERS).insert(newOrder);
  };
  public getOrderById = async (id: Order) => {
    const checkout: OrderTypeAtDatabase[] = await BaseDatabase.connections(
      OrderDatabase.ORDERS
    )
      .select(
        "pizzaria_orders.id",
        "pizzaria_orders.date",
        "pizzaria_sabores.name",
        "pizzaria_orders.quantity",
        "pizzaria_orders.status",
        "pizzaria_precos.tipo_id",
        "pizzaria_precos.price"
      )
      .where("pizzaria_orders.id", "=", id)
      .innerJoin(
        PriceDatabase.PIZZA_PRICES,
        "pizzaria_orders.price_id",
        "=",
        "pizzaria_precos.id"
      )
      .innerJoin(
        PizzaDatabase.PIZZA_FLAVORS,
        "pizzaria_precos.sabor_id",
        "=",
        "pizzaria_sabores.id"
      );
    return checkout;
  };
  public getOrders = async () => {
    const checkout: OrderTypeAtDatabase[] = await BaseDatabase.connections(
      OrderDatabase.ORDERS
    )
      .select(
        "pizzaria_orders.id",
        "pizzaria_orders.date",
        "pizzaria_sabores.name",
        "pizzaria_orders.quantity",
        "pizzaria_precos.tipo_id",
        "pizzaria_orders.status",
        "pizzaria_precos.price"
      )
      .from(OrderDatabase.ORDERS)
      .innerJoin(
        PriceDatabase.PIZZA_PRICES,
        "pizzaria_orders.price_id",
        "=",
        "pizzaria_precos.id"
      )
      .innerJoin(
        PizzaDatabase.PIZZA_FLAVORS,
        "pizzaria_precos.sabor_id",
        "=",
        "pizzaria_sabores.id"
      );
    return checkout;
  };
}

// SELECT pizzaria_orders.id, pizzaria_sabores.name ,pizzaria_orders.quantity, pizzaria_precos.tipo_id,pizzaria_precos.price
// FROM pizzaria_orders
// INNER JOIN pizzaria_precos
// ON pizzaria_orders.price_id = pizzaria_precos.id
// INNER JOIN pizzaria_sabores
// ON pizzaria_precos.sabor_id = pizzaria_sabores.id;
