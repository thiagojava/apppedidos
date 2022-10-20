import { Request, Response } from "express";

const puppeteer = require("puppeteer")

export class WhatsappController {
    public sendMessageWhatsapp = async (req:Request,res:Response) =>{
        const phone = "5541998415276";
        let messsagem = "OBA!!! CHEGOU UM PEDIDO PARA SUA PIZZARIA: PIZZA DE LINGUICETA MAIS COCA COLA GELADINHA";
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Safari'
           )    
        await page.goto('https://web.whatsapp.com/send?phone='+phone+'&text='+messsagem+'')
        await delay(40000)
        console.log("conetado com sucesso");

        await page.click("span[data-testid='send']")
        await delay(5000);
        res.status(200).send({message:"Enviado"})
    }
      
}
function delay(time:any){
    return new Promise(function(resolve){
        setTimeout(resolve,time)
    })
  }