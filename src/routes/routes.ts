import express, { Router } from "express";
import DefaultControler from "../controllers/default.js";

const router = Router();

const Default = new DefaultControler();


router.get("/", Default.sendHello);

export default router;