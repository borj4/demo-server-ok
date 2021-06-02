const fetch = require('node-fetch');

const products = {
    getProducts: async (url) => {
        let data = [];
        let response = await fetch(url);
        let prod = await response.json();   

        // Crear el JSON
        // sin ID --> [{},{},{},{}]
        // con ID --> {}--> convertir a [{}]
        Array.isArray(prod)?data=prod:data=[prod];
        return data;
    },
    createProduct: async (url,data) => {

        // Ejemplo
        // Pegar en body para REST client
        /*
        {
            "title": "probando nuevo producto",
            "price": 3.5,
            "description": "Camiseta molona",
            "image": "https://i.pravatar.cc",
            "category": "clothes"
          }
        */
        let response = await fetch(url,
        {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify(
                    data
                )
        });
        let prod = await response.json(); 
        console.log("***************")
        console.log(prod)  
        return prod;
    }
}
module.exports = products;