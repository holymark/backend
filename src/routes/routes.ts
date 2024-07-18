import  { Router } from "express";
import DefaultControler from "../controllers/default.js";
import UserController from "../controllers/user.js";
import ProductControler from "../controllers/product.js";

const router = Router();

const Default = new DefaultControler();
const User = new UserController();
const Product = new ProductControler();

// /ping is for testing sever health
router.get("/ping", Default.sendHello);

router.post("/user/login", User.auth);
router.post("/user/register", User.register);
router.get("/user/:id", User.getUser);
router.delete("/user/:id", User.deleteUser);

router.post("/product/create", Product.auth, Product.createProduct);
router.get("/product", Product.getProducts);
router.delete("/product/:id", Product.deleteProduct);

export default router;