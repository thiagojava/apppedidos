import { PizzaFlavorStatus, UserRole } from "../types";

export interface PizzaTypesAtDatabase {
  id: string;
  name: string;
  description: string;
  status: PizzaFlavorStatus;
}

export interface GetPizzas {
  token: string | undefined;
  search: string;
  order: string;
  sort: string;
  limit: string;
  page: string;
}

export interface GetPizzasSearch {
  search: string;
  order: string;
  sort: string;
  limit: number;
  offset: number;
}

export default class Pizza {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private status: PizzaFlavorStatus
  ) {}

  public getId = () => {
    return this.id;
  };
  public getName = () => {
    return this.name;
  };
  public getDescription = () => {
    return this.description;
  };
  public getStatus = () => {
    return this.status;
  };
  public setId = (newId: string) => {
    this.id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setDescription = (newDescription: string) => {
    this.description = newDescription;
  };
  public setStatus = (newStatus: PizzaFlavorStatus) => {
    this.status = newStatus;
  };
}
