import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'data.json');

class ProductManager{
    constructor(){
        this.products=[]
        this.path
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if(!thumbnail){
            thumbnail = ""
        }
        const product_id=this.products.length+1
        const required_fields = [title, description, price, code, stock].includes("")
        if(required_fields){
            console.log("Debes completar todos los campos")
            return
        }
        const code_found =this.products.find((product)=>product.code===product.code)
        if(code_found){
            console.log("Código de producto encontrado, debes cambiar el Código de producto")
            return
        }
        const product={
            id:product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product)
        fs.writeFileSync(dataPath, JSON.stringify(this.products, null, 2));
    }
    getProducts(){
        try {
            const data_reading = fs.readFileSync(dataPath, "utf-8")
            const data_products = JSON.parse(data_reading)
            return data_products
        } catch (error) {
            console.error("Error de lectura", error);
        }   
        return this.products
    }
    getProductsById(id){
        const data_reading = this.getProducts()
        const product_found = data_reading.find((product)=>product.id===id)
        if(!product_found){
            console.log("Product Not Found")
            return
        }
        return product_found
    }
    updateProduct(id, campo, dato){
        const data_reading = this.getProductsById(id);
        let product_found = this.getProducts();
        if(!data_reading){
            console.log("Product Not Found. No se pudo actualizar el producto.")
            return
        }
        if (data_reading[campo] === dato) {
            console.log("Es el mismo dato. No se necesita actualizar el producto.");
            return;
          }
        data_reading[campo] = dato;
        product_found = product_found.map((p) => {
            if(p.id === id){
                return data_reading
            }
            return p
        });
        fs.writeFileSync(dataPath, JSON.stringify(product_found, null, 2));
        console.log("Producto actualizado exitosamente");
        return product_found
    }
    deleteProduct(id){
        const data_reading = this.getProductsById(id);
        let product_found = this.getProducts();
        if(!data_reading){
            console.log("Product Not Found. El producto no existe.")
            return
        }
        product_found = product_found.filter((p) => p.id !== id);
        fs.writeFileSync(dataPath, JSON.stringify(product_found, null, 2))
        console.log("Producto eliminado exitosamente")
    }

}
 /*SEGUNDA ENTREGA*/
// const productManager = new ProductManager()
// console.log(productManager.getProducts())
// productManager.getProductsById(2)
// productManager.updateProduct(2, "title","Muffin - Mix - Strawberry Rhubarb 2")
// productManager.deleteProduct(2)

/*TERCERA ENTREGA*/
export default ProductManager;