const express = require("express")
const app = express()
const products = require("./Routes/products.router")
const cart = require("./Routes/cart.router")
const handler = require("./Routes/views.router")
const handleBars = require("express-handlebars")
const path = require("path")
const s = require("socket.io").Server
const moongoose = require("mongoose")
const productsModel = require("./models/products.modelo.js")





PORT= 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));


// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "\\views");
app.set("view engine","handlebars")






app.use("/api/products/",products)
app.use("/api/carts/",cart)



app.use("/",handler)





const serverExpress = app.listen(PORT,()=>{



    console.log("server corriendo en el puerto: " + PORT )
})




const serverSocket = new s(serverExpress)
serverSocket.on("connection", sock => {

    console.log(sock.id)

    sock.on("newProduct", agregarProducto =>{
    const newP = productsModel.create(agregarProducto)
    })


    sock.on("deleted", async (id) => {

     const idDelete = id.id
     console.log(idDelete)
     const deletProduct = await productsModel.deleteOne({_id:idDelete})


    })




})


moongoose.connect("mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority")
  .then(console.log("db conectada"))
  .catch(error => console.log(error))