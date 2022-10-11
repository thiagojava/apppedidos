import { Request, Response } from "express";
import PriceBusiness from "../business/PriceBusiness";
import { GetPizzaPrice } from "../model/Price";

export class PriceController {
  constructor(protected priceBusiness: PriceBusiness) {}

  public setPizzaPrice = async (req: Request, res: Response) => {
    try {
      const input: any = {
        token: req.headers.authorization,
        sabor_id: req.body.sabor_id,
        tipo_id: req.body.tipo_id,
        price: req.body.price,
      };

      const response = await this.priceBusiness.setPrice(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
  public getPizzasPrices = async (req: Request, res: Response) => {
    try {
      const input: GetPizzaPrice = {
        token: req.headers.authorization,
        search: req.query.search as string,
        order: req.query.order as string,
        sort: req.query.sort as string,
        limit: req.query.limit as string,
        page: req.query.page as string,
      };

      const response = await this.priceBusiness.getPizzaPrice(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
}
