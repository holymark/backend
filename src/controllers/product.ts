import { Request, Response } from "express";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

class ProductControler {
  public async auth(req: Request, res: Response, next: Function) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
      const decoded = jwt.verify(token, "secret");
      req.body.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  }

  public async createProduct(req: Request, res: Response) {
    const { name, description, price, imageURL , brand} = req.body;
    if (!name || !description || !price || !imageURL) {
      return res.status(400).json({ message: "Invalid product data" });
    }


    const product = await Product.create({
      name,
      description,
      price,
      brand,
      imageURL,
    }, { createdBy: req.body.user.id });

    res.json(product);
  }


  public async getProducts(req: Request, res: Response) {
    const products = await Product.find().populate('createdBy');
    res.json(products);
  }

  public async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, imageURL } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
  }
  await product.updateOne({ name, description, price, imageURL });
  res.json(product);
}
}

export default ProductControler;
