import express from "express";

const router = express.Router();
const carts = [];
const lastId = 0;

function generateId(){
    return ++lastId.toString();
}

router.post('/', (req,res) => {
    const cart = {
        id: generateId(), 
        products: []
    }
    carts.push(cart);
    res.status(201).json(cart);
});

router.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const cart_cid = carts.find(c => c.id === cid);
    if (cart_cid) {
      res.status(200).json(cart_cid);
    } else {
      res.status(404).json({message: 'Cart not found'});
    }
  });

  router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = carts.find(c => c.id === cid);
    const product = products.find(p => p.id === pid);
    if (cart && product) {
      const item = cart.products.find(i => i.product === pid);
      if (!item) {
        cart.products.push({product: pid, quantity: 1});
      } else {
        item.quantity++;
      }
      res.status(200).json(cart);
    } else {
      res.status(404).json({message: 'Cart or product not found'});
    }
  });
  

export default router;