const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const inicializaPassport = require("./config/passport.config")
const inicializePassportJWT = require("./config/jwt.config")


const products = require("./Routes/products.router")
const cart = require("./Routes/cart.router")
const handler = require("./Routes/views.router")
const chat = require("./Routes/chat.router")
const sessions_ = require("./Routes/session.router")


const handleBars = require("express-handlebars")
const path = require("path")
const s = require("socket.io").Server

const connectMongo = require("connect-mongo")
const moongoose = require("mongoose")

const productsModel = require("./models/products.modelo.js")
const chatModel = require("./models/chat.modelo")






PORT= 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "\\views");
app.set("view engine","handlebars")

app.use(session({
      secret:"codersecret",
      resave:true,
      saveUninitialized:true,
      store:connectMongo.create({
        mongoUrl:"mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority",
        ttl:30
      })
      
}))


inicializaPassport()
inicializePassportJWT()
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products",products)
app.use("/api/carts/",cart)
app.use("/",handler) //views
app.use("/chat",chat)
app.use("/api/sessions/", sessions_)



const serverExpress = app.listen(PORT,()=>{



    console.log("server corriendo en el puerto: " + PORT )
})




const serverSocket = new s(serverExpress)
serverSocket.on("connection", sock => {

    console.log(sock.id)

    sock.on("newProduct", agregarProducto =>{
    console.log(agregarProducto)
    const newP = productsModel.create(agregarProducto)
    })


    sock.on("deleted", async (id) => {

     const idDelete = id.id
     console.log(idDelete)
     const deletProduct = await productsModel.deleteOne({_id:idDelete})


    })
    
    sock.on("ne", async (nuevoMensaje)=>{

      const newchat = await chatModel.create(nuevoMensaje)
      const newMessage = await chatModel.find().lean()
      
      
      
      sock.broadcast.emit("new",newMessage)
      sock.emit("new",newMessage)

    })




})


moongoose.connect("mongodb+srv://alonsoalonsl431432:4810FWBGvJc1ajOm@eri.tytp383.mongodb.net/?retryWrites=true&w=majority")
  .then(console.log("db conectada"))
  .catch(error => console.log(error))

/*
  app.engine("handlebars", engine({
     runtimeOptions:{
        allowProtoPropertiesByDefault : true ,
        allowProtoMethodsByDefault : true
     },


  }))
  */