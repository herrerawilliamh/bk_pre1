import express from "express";
import ProductManager from "../ProductManager.js";

const router = express.Router();
const productManager = new ProductManager();
const products = productManager.getProducts();

router.get("/products", (req, res) => {
    const limit = req.query.limit || products.length;
    res.json(products.slice(0, limit));
})

router.get("/products/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = products.find(p => p.id === idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    res.send({ product });
})

router.post("/products", (req, res)=>{
    const {title, description, price, thumbnail, code, stock} = req.body;
    const empty = Object.keys(req.body).length === 0;
    if (!empty) {
        productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.send("Producto agregado exitosamente");
    } else {
        // Enviar un mensaje de error si req.body es vacío
        res.send("No se han enviado datos por el método post");
    }
})

router.put("/products/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = productManager.getProductsById(idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    const {campo, dato} = req.body;
    const empty = Object.keys(req.body).length === 0;
    if(!empty){
        productManager.updateProduct(idProduct, campo, dato);
        res.send("Producto actualizado exitosamente");
    }else{
        res.send("No se han enviado datos por el método put");
    }
})

router.delete("/products/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid);
    const product = productManager.getProductsById(idProduct);
    if(!product) return res.send({error: "Producto no encontrado"}); 
    productManager.deleteProduct(idProduct);
    res.send("Producto eliminado exitosamente"); 
})

export default router;
