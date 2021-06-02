const router = require('express').Router();
const pages = require('./pages');

// Aquí van las rutas
// ...
// ...
router.get('/', pages.home);
router.get('/about', pages.about)
router.get('/contact', pages.contact)
// pictures
// pictures/33
// pictures/22/deportes
router.get('/pictures/:id?/:tematica?', pages.pictures)
router.get('/location', pages.location)
//http://localhost:3000/products?id=22  --> product id=22
//http://localhost:3000/products 
router.get('/products', pages.products)
router.post('/products', pages.addProduct)
router.get('*', pages.home) // Ruta por defecto

module.exports = router;