import { Request, Response, Router } from "express";
import { WhatsappController } from "../controller/WhatsappController";

const whatsappRouter = Router();
const whatsappController = new WhatsappController

whatsappRouter.get("/wpp", whatsappController.sendMessageWhatsapp);

export default whatsappRouter
