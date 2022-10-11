import { UserRole } from "../types";

export interface UserTypesAtDatabase {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  street: string;
  district: string;
  number: string;
  reference: string;
  role: UserRole;
}

export default class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private whatsapp: string,
    private password: string,
    private cep: string,
    private street: string,
    private district: string,
    private number: string,
    private reference: string,
    private role: UserRole
  ) {}

  public getId = () => {
    return this.id;
  };
  public getName = () => {
    return this.name;
  };
  public getEmail = () => {
    return this.email;
  };
  public getWhatsapp = () => {
    return this.whatsapp;
  };
  public getPassword = () => {
    return this.password;
  };
  public getCep = () => {
    return this.cep;
  };
  public getStreet = () => {
    return this.street;
  };
  public getDistrict = () => {
    return this.district;
  };
  public getNumber = () => {
    return this.number;
  };
  public getReference = () => {
    return this.reference;
  };
  public getRole = () => {
    return this.role;
  };
  public setId = (newId: string) => {
    this.id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setEmail = (newEmail: string) => {
    this.email = newEmail;
  };
  public setWhatsapp = (newWhatsapp: string) => {
    this.whatsapp = newWhatsapp;
  };
  public setPassword = (newPassword: string) => {
    this.password = newPassword;
  };
  public setCep = (newCep: string) => {
    this.cep = newCep;
  };
  public setStreet = (newStreet: string) => {
    this.street = newStreet;
  };
  public setDistrict = (newDistrict: string) => {
    this.district = newDistrict;
  };
  public setNumber = (newNumber: string) => {
    this.number = newNumber;
  };
  public setReference = (newReference: string) => {
    this.reference = newReference;
  };
  public setRole = (newRole: UserRole) => {
    this.role = newRole;
  };
}
