import express from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { pizzaRouter } from "./router/pizzaRouter";
import { priceRouter } from "./router/priceRouter";
import { orderRouter } from "./router/OrderRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log("Servidor rodando na porta 3003");
});
export default app;

app.use("/", userRouter);
app.use("/", pizzaRouter);
app.use("/", priceRouter);
app.use("/", orderRouter);
