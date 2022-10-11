"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, email, whatsapp, password, cep, street, district, number, reference, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.whatsapp = whatsapp;
        this.password = password;
        this.cep = cep;
        this.street = street;
        this.district = district;
        this.number = number;
        this.reference = reference;
        this.role = role;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getWhatsapp = () => {
            return this.whatsapp;
        };
        this.getPassword = () => {
            return this.password;
        };
        this.getCep = () => {
            return this.cep;
        };
        this.getStreet = () => {
            return this.street;
        };
        this.getDistrict = () => {
            return this.district;
        };
        this.getNumber = () => {
            return this.number;
        };
        this.getReference = () => {
            return this.reference;
        };
        this.getRole = () => {
            return this.role;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setEmail = (newEmail) => {
            this.email = newEmail;
        };
        this.setWhatsapp = (newWhatsapp) => {
            this.whatsapp = newWhatsapp;
        };
        this.setPassword = (newPassword) => {
            this.password = newPassword;
        };
        this.setCep = (newCep) => {
            this.cep = newCep;
        };
        this.setStreet = (newStreet) => {
            this.street = newStreet;
        };
        this.setDistrict = (newDistrict) => {
            this.district = newDistrict;
        };
        this.setNumber = (newNumber) => {
            this.number = newNumber;
        };
        this.setReference = (newReference) => {
            this.reference = newReference;
        };
        this.setRole = (newRole) => {
            this.role = newRole;
        };
    }
}
exports.default = User;
