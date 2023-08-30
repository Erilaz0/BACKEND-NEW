const express = require("express")
const app = express()
const products = require("./Routes/products.router")
const cart = require("./Routes/cart.router")
const bodyParser = require('body-parser')


PORT= 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use("/api/products/",products)
app.use("/api/carts/",cart)






















app.listen(PORT,()=>{



    console.log("server corriendo en el puerto: " + PORT )
})