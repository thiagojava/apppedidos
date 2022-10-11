"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pizza {
    constructor(id, name, description, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getDescription = () => {
            return this.description;
        };
        this.getStatus = () => {
            return this.status;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setDescription = (newDescription) => {
            this.description = newDescription;
        };
        this.setStatus = (newStatus) => {
            this.status = newStatus;
        };
    }
}
exports.default = Pizza;
