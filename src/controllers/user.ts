import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  public async auth(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({
      token,
      user,
    });
  }

  public async register(req: Request, res: Response) {
    const { email, password } = req.body;
    if(email&&password){
      const user = await User.create({ email, password });
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
      res.json({
        token,
        user,
      });
    }
    else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      }
    await user.deleteOne();
    res.json({ message: "User deleted" });
  }

}

export default UserController;
