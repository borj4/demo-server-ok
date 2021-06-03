const router = require('express').Router();
const products = require('./products');

//http://localhost:3000/api/products?id=2  --> product id=2
router.get('/products', products.getProducts)
router.post('/products', products.addProduct)

// agregamos una ruta nueva que devuelve los productos almacenados en mi falsa base de datos (JSON)
router.get('/myproducts', products.getMyProducts)

router.get('/comida', products.getFood)

router.all("*", (req, res) =>
  res
    .status(404)
    .json({ message: "Route does not exist", app: "Express-Routes" })
);


module.exports = router;