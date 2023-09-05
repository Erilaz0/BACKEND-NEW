const express = require("express")
const app = express()
const products = require("./Routes/products.router")
const cart = require("./Routes/cart.router")
const handler = require("./Routes/realtimeproducts.router")
const handleBars = require("express-handlebars")
const path = require("path")
const s = require("socket.io").Server




PORT= 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "\\vista");
app.set("view engine","handlebars")

app.use(express.static(path.join(__dirname,"/public")))


app.use("/api/products/",products)
app.use("/api/carts/",cart)



app.use("/",handler)




const serverExpress = app.listen(PORT,()=>{



    console.log("server corriendo en el puerto: " + PORT )
})




const serverSocket = new s(serverExpress)

serverSocket.on("connection",socket=>{



    let nombre = "alan"
    console.log(`identificacion ${socket.id}`)
    console.log("a")

})