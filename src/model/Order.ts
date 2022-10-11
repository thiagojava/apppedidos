import { OrderStatus } from "../types";

export interface OrderTypeAtDatabase {
  id: string;
  client_email: string;
  price_id: string;
  quantity: number;
  status: OrderStatus;
}

export interface GetOrder {
  token: string | undefined;
  search: string;
  order: string;
  sort: string;
  limit: string;
  page: string;
}

export interface GetOrderSearch {
  search: string;
  order: string;
  sort: string;
  limit: number;
  offset: number;
}
export default class Order {
  constructor(
    private id: string,
    private client_email: string,
    private price_id: string,
    private quantity: number,
    private status: OrderStatus
  ) {}

  public getId = () => {
    return this.id;
  };
  public getClientEmail = () => {
    return this.client_email;
  };
  public getPriceId = () => {
    return this.price_id;
  };
  public getQuantity = () => {
    return this.quantity;
  };
  public getOrderStatus = () => {
    return this.status;
  };
  public setId = (newId: string) => {
    this.id = newId;
  };
  public setClientEmail = (newClienteEmail: string) => {
    this.client_email = newClienteEmail;
  };
  public setPriceId = (newPriceId: string) => {
    this.price_id = newPriceId;
  };
  public setQuantity = (newQuantity: number) => {
    this.quantity = newQuantity;
  };
  public setOrderStatus = (newOrderStatus: number) => {
    this.quantity = newOrderStatus;
  };
}
