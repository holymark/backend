import  { Router } from "express";
import DefaultControler from "../controllers/default.js";
import UserController from "../controllers/user.js";
import ProductControler from "../controllers/product.js";
import cors from "cors";

const router = Router();

const Default = new DefaultControler();
const User = new UserController();
const Product = new ProductControler();

const corsOptions = {
    origin: 'https://5173-idx-learnlyapp-comerce-1721181347524.cluster-4ezwrnmkojawstf2k7vqy36oe6.cloudworkstations.dev', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

// /ping is for testing sever health
router.get("/api/ping", Default.sendHello);
router.get("/", Default.sendHello);

router.post("/api/auth/login", User.auth);
router.post("/api/auth/register", User.register);
router.get("/api/user/:id", User.getUser);
router.delete("/user/:id", User.deleteUser);

router.post("/api/product/create", Product.auth, Product.createProduct);
router.get("/api/products", Product.getProducts);
router.put("/api/product/:id", Product.auth, Product.updateProduct);
router.delete("/product/:id", Product.auth, Product.deleteProduct);

export default router;