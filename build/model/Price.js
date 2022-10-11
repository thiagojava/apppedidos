"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    constructor(id, sabor_id, tipo_id, price) {
        this.id = id;
        this.sabor_id = sabor_id;
        this.tipo_id = tipo_id;
        this.price = price;
        this.getId = () => {
            return this.id;
        };
        this.getSabor = () => {
            return this.sabor_id;
        };
        this.getTamanho = () => {
            return this.tipo_id;
        };
        this.getPrice = () => {
            return this.price;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setSabor = (newSabor) => {
            this.sabor_id = newSabor;
        };
        this.setTamanho = (newTamanho) => {
            this.tipo_id = newTamanho;
        };
        this.setPrice = (newPrice) => {
            this.price = newPrice;
        };
    }
}
exports.default = Price;
