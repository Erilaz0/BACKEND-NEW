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

const productsService = require("./services/products.service")
const chatService = require("./services/chat.service")

const config = require("../src/config/config")




PORT= parseInt(config.PORT)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "\\views");
app.set("view engine","handlebars")

app.use(session({
      secret:config.SECRET,
      resave:true,
      saveUninitialized:true,
      store:connectMongo.create({
        mongoUrl:config.MONGO_URL,
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

    sock.on("newProduct", async( agregarProducto ) =>{
    console.log(agregarProducto)
    const newP = await productsService.createProduct(agregarProducto)
    })


    sock.on("deleted", async (idProduct) => {

     const id = idProduct.id
     const deletProduct = await productsService.deleteProduct(id)


    })
    
    sock.on("ne", async (nuevoMensaje)=>{

      const newchat = await chatService.addMessage(nuevoMensaje)
      const newMessage = await chatService.getChat()
      
      
      
      sock.broadcast.emit("new",newMessage)
      sock.emit("new",newMessage)

    })




})


moongoose.connect(config.MONGO_URL)
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