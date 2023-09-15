/*IMPORTS*/
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'

/*VARS*/
const app = express();
const PORT = 8080
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/*Middlewars*/
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*Manager Public Folder*/
app.use(express.static(path.join(__dirname, 'public')))

/*Routes*/
app.use("/", productsRouter)
app.use("/", cartsRouter)

/*Server Route to .html*/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})