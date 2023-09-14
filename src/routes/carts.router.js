import express from "express";
import ProductManager from "../ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();
const carts = productManager.getProducts();



export default router;