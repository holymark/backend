import { Request, Response } from "express";
import router from "../routes/routes.js";

class DefaultControler {
 
  public async sendHello(req: Request, res: Response) {
    return res.send("Hello, World!")
  }
}

export default DefaultControler;