import { Request, Response } from "express";

class DefaultControler {
 
  public async sendHello(req: Request, res: Response) {
    return res.send("Hello, World!")
  }
}

export default DefaultControler;