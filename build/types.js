"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.PizzaSize = exports.PizzaFlavorStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "normal";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var PizzaFlavorStatus;
(function (PizzaFlavorStatus) {
    PizzaFlavorStatus["IN_STOCK"] = "inStock";
    PizzaFlavorStatus["OUT_OF_STOCK"] = "notInStock";
})(PizzaFlavorStatus = exports.PizzaFlavorStatus || (exports.PizzaFlavorStatus = {}));
var PizzaSize;
(function (PizzaSize) {
    PizzaSize["BROTO"] = "broto";
    PizzaSize["MEDIA"] = "media";
    PizzaSize["FAMILIA"] = "familia";
    PizzaSize["SUPERGG"] = "superGG";
    PizzaSize["REDONDA"] = "redonda";
    PizzaSize["OUTROS"] = "outros";
})(PizzaSize = exports.PizzaSize || (exports.PizzaSize = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PREPARANDO"] = "preparando";
    OrderStatus["DELIVERY"] = "delivery";
    OrderStatus["FINALIZADO"] = "finalizado";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
