import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.router.js';


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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})