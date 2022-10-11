"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, client_email, price_id, quantity, status) {
        this.id = id;
        this.client_email = client_email;
        this.price_id = price_id;
        this.quantity = quantity;
        this.status = status;
        this.getId = () => {
            return this.id;
        };
        this.getClientEmail = () => {
            return this.client_email;
        };
        this.getPriceId = () => {
            return this.price_id;
        };
        this.getQuantity = () => {
            return this.quantity;
        };
        this.getOrderStatus = () => {
            return this.status;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setClientEmail = (newClienteEmail) => {
            this.client_email = newClienteEmail;
        };
        this.setPriceId = (newPriceId) => {
            this.price_id = newPriceId;
        };
        this.setQuantity = (newQuantity) => {
            this.quantity = newQuantity;
        };
        this.setOrderStatus = (newOrderStatus) => {
            this.quantity = newOrderStatus;
        };
    }
}
exports.default = Order;
