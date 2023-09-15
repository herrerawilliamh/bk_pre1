import express from "express";
import ProductManager from "../ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();
const products = productManager.getProducts();

router.get("/", (req, res) => {
    const limit = req.query.limit || products.length;
    res.json(products.slice(0, limit));
})

router.get("/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = products.find(p => p.id === idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    res.send({ product });
})

router.post("/", (req, res)=>{
    const {title, description, price, thumbnail, code, stock} = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.send("Producto agregado exitosamente");
})

router.put("/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = productManager.getProductById(idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    const {campo, dato} = req.body;
    productManager.updateProduct(idProduct, campo, dato);
})

router.delete("/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = productManager.getProductById(idProduct);
    if(!product) return res.send({error: "Producto no encontrado"}); 
    productManager.deleteProduct(idProduct);
    res.send("Producto eliminado exitosamente"); 
})

export default router;
