import { PizzaFlavorStatus, PizzaSize, UserRole } from "../types";

export interface PriceTypeAtDatabase {
  id: string;
  sabor_id: string;
  tipo_id: PizzaSize;
  price: number;
}

export interface GetPizzaPrice {
  token: string | undefined;
  search: string;
  order: string;
  sort: string;
  limit: string;
  page: string;
}

export interface GetPizzaPriceSearch {
  search: string;
  order: string;
  sort: string;
  limit: number;
  offset: number;
}
export default class Price {
  constructor(
    private id: string,
    private sabor_id: string,
    private tipo_id: PizzaSize,
    private price: number
  ) {}

  public getId = () => {
    return this.id;
  };
  public getSabor = () => {
    return this.sabor_id;
  };
  public getTamanho = () => {
    return this.tipo_id;
  };
  public getPrice = () => {
    return this.price;
  };
  public setId = (newId: string) => {
    this.id = newId;
  };
  public setSabor = (newSabor: string) => {
    this.sabor_id = newSabor;
  };
  public setTamanho = (newTamanho: PizzaSize) => {
    this.tipo_id = newTamanho;
  };
  public setPrice = (newPrice: number) => {
    this.price = newPrice;
  };
}
