const prod = require('../utils/products')
const menu = require('../data/menu')
const allMyProducts = require('../data/myProducts')
const fs = require('fs')

const routes = {
    getProducts:  async (req, res) => {
        let id = req.query.id || "";
        let data = await prod.getProducts(`https://fakestoreapi.com/products/${id}`)
        // Cambiar siguiente linea
        res.status(200).json(data);
    },
    addProduct: (req, res) => {
        // recibo el producto nuevo en el cuerpo de la petición
        const newProduct = req.body
        // en esta variable global almacenaré lo que tengo en base de datos y le añadiré el producto nuevo que recibo por body
        let dataToStore = []

        if(!newProduct.title || !newProduct.price || !newProduct.description){
            res.status(406).json({
                success: false,
                message: "Datos incompletos"       
            })
        } else {
            fs.readFile('./data/myProducts.json', 'utf8', (err, data) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err       
                    })
                }
                // almaceno en mi variable dataToStore lo que tenía en mi JSON
                dataToStore = JSON.parse(data)
                // añado a mi array el nuevo producto
                dataToStore.push(newProduct)
    
                // Sobreescribo mi json con el array nuevo de productos (debo estar parseado a string)
                fs.writeFile('./data/myProducts.json', JSON.stringify(dataToStore), (err, data) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: err       
                        })
                    } else {
                        console.log('The file has been saved!');
                        // si todo va bien, devuelvo una respuesta con un status code 200
                        res.status(200).json({
                            success: true,
                            data: newProduct,
                            message: `Tu nuevo producto ${req.body.title}, fue añadido con éxito`       
                        })
                    }
                });
            })
        }
    },
    getMyProducts: (req, res) =>{
        res.status(200).json({
            success: true,
            data: allMyProducts
        })
    },
    getFood: (req, res) => {
        res.status(200).json(menu);
    }
}
module.exports = routes;