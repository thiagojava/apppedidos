"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceController = void 0;
class PriceController {
    constructor(priceBusiness) {
        this.priceBusiness = priceBusiness;
        this.setPizzaPrice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    sabor_id: req.body.sabor_id,
                    tipo_id: req.body.tipo_id,
                    price: req.body.price,
                };
                const response = yield this.priceBusiness.setPrice(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.getPizzasPrices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    search: req.query.search,
                    order: req.query.order,
                    sort: req.query.sort,
                    limit: req.query.limit,
                    page: req.query.page,
                };
                const response = yield this.priceBusiness.getPizzaPrice(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
    }
}
exports.PriceController = PriceController;
