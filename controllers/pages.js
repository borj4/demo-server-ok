const prod = require('../utils/products')

const routes = {
    home:(req, res) => {
        //res.send('Es la Home!!')
        let datos = {nombre:"alex"};
        res.status(200).render('home',datos);
      },
    about:(req, res) => {
        res.status(200).send('Esto es about')
        },
    contact:(req, res) => {
        let datos = {nombre:"al formulario de contacto"};
        res.status(200).render('home',datos)
      },
    pictures:(req, res) => {
        //console.log(req.params.id);
        //console.log(req.params.tematica);
        //console.log(req.params)
        // /pictures
        if(!req.params.id){
            res.status(200).render('pictures')
        }
        // /pictures/67
        else if(req.params.id && !req.params.tematica){
            /^\d+$/.test(req.params.id)?
                res.status(200).render('pictures',{
                                            id:req.params.id
                                            }
                ):
                res.status(404).send(`ID incorrecto!!:${req.params.id}`)
        // /pictures/67/deportes
        }else{
            /^\d+$/.test(req.params.id)?
                res.status(200).render('pictures',{
                                                    id:req.params.id,
                                                    tematica:req.params.tematica
                                                    }
                ):
                res.status(404).send(`ID incorrecto!!:${req.params.id}`)
        }
    },
    location:(req, res) => {
        console.log(req.query);

        res.status(200).send(`Esto es location!!. Lat:${req.query.lat?req.query.lat:"--"} Lon:${req.query.lon?req.query.lon:"--"}`)
      },
    products: async (req, res) => {
        let id = req.query.id || "";
        let data = await prod.getProducts(`https://fakestoreapi.com/products/${id}`)
        res.status(200).render('product',{data});
    },
    addProduct: async (req, res) => {
        let data = await prod.createProduct('https://fakestoreapi.com/products',req.body);
        console.log(data);
        res.status(200).send("enviado");
        //res.status(200).render('product',{data});
    }
}

module.exports = routes;