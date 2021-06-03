const express = require('express')
const router = require('./controllers/index')
const routerApi = require('./controllers/routerApi')
const cors = require('cors')
const app = express()
const port = 3000

// Para evitar problemas de CORS (Cross-Origin Resource Sharing)
// Añado un middleWare que permite consultas desde orígines de terceros
// ...
app.use(cors())

// Motor de vistas
app.set('view engine', 'pug');
app.set('views','./views');

// Para habilitar recepcion de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Para acceder con API KEY: http://localhost:3000/products?id=4&API_KEY=123abcd
// http://localhost:3000?API_KEY=123abcd

//API
//http://localhost:3000/api/products
//http://localhost:3000/api/products?id=2 
app.use('/api',routerApi); // rutas para API

// WEB: usar el Router
app.use('/',router); // rutas para WEB


// Manejo de errores
// Si recibo una petición a un endpoint inexistente:
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

// Para manejar cualquier otro tipo de error de mi servidor:
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})