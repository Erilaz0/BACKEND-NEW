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
const mocking = require("../src/Routes/mocking.router.js")
const logger = require("./Routes/logger.router.js")
const passwdReset = require("./Routes/passwdReset.router.js")
const premium = require("./Routes/premium.router.js")


const handleBars = require("express-handlebars")
const path = require("path")
const s = require("socket.io").Server

const connectMongo = require("connect-mongo")
const mongoose = require("mongoose")

const productsService = require("./services/products.service")
const chatService = require("./services/chat.service")

const config = require("../src/config/config")
const cartsService = require("./services/carts.service")
const usersService = require("./services/users.service")
const ticketsService = require("./services/tickets.service")
const { serverConfig } = require("./functions/serverConfig.js")
const test = require("./functions/testingMongo")
const CustomError  = require("./Error/customError.js")
const typeError = require("./Error/typeError.js")
const cors = require('cors');

const { generaJWT } = require("./utils.js")
const { sendReset, sendDeletedProductAdvice, sendTicket , sendError } = require("./mailing/send.js")

serverConfig()
const swagger_jsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


const options = {
 
  definition :{
    
    openapi : "3.0.0",
    info:{

     title:"api abm products",
     version : "1.0.0",
     description:"documentacion del proyecto api abm products"
    }
    },
    apis:[path.resolve(__dirname, "./docs/*.yaml")]

  


}
const specs = swagger_jsdoc(options);









test()


PORT= process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());
app.use(cors())                        
app.use('/uploads', express.static('uploads'));



app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "/views");
app.set("view engine","handlebars")

app.use(session({
      secret: process.env.SECRET || config.SECRET,
      resave:true,
      saveUninitialized:true,
      store:connectMongo.create({
        mongoUrl: process.env.MONGO_URL || config.MONGO_URL,
        ttl:10
      })
      
}))


inicializaPassport()
inicializePassportJWT()
app.use(passport.initialize())
app.use(passport.session())



app.use("/api/products",products)
app.use("/api/carts/",cart)
app.use("/",handler) 
app.use("/chat",chat)
app.use("/api/sessions/", sessions_ )
app.use("/mockingproducts",mocking )
app.use("/loggerTest", logger )
app.use( "/restablecer" , passwdReset )
app.use("/api/users" , premium )
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(specs))






const serverExpress = app.listen( PORT , "0.0.0.0" ,()=>{



    let puerto = PORT
})




const serverSocket = new s(serverExpress)
serverSocket.on("connection", sock => {

    
    
    sock.on("newProduct", async( agregarProducto ) =>{
    
    const newP = await productsService.createProduct(agregarProducto)
    
    })











    
    sock.on( "deleted" , async ( idProduct ) => {

     const id = idProduct.id
    
     if( !idProduct.email ){
      const product = await productsService.productById( id )
      
      if( product.owner === "admin"){

        return await productsService.deleteProduct( id )

      }else{
        let ownerEmail = product.owner
        
        sendDeletedProductAdvice( ownerEmail , product.title  )
        .then( async(data) => { return await productsService.deleteProduct( id ) })
        .catch(error => sendError(error)
               .then((sended) =>{ let i = sended })
               .catch((error) =>{ let i = error }))


      

      }
      
      
      
     }else{ 
      
      const email = idProduct.email
      const product = await productsService.productById( id )

      if( email === product.owner){
       
        let ownerEmail = product.owner
        sendDeletedProductAdvice( ownerEmail , product.title  )
        .then( async(data) => { return await productsService.deleteProduct( id ) })
        .catch(error => sendError(error)
               .then((sended) =>{ let i = sended })
               .catch((error) =>{ let i = error }))
 
      
 
 
      }else{
 
       let i = 0
      }
   

     }
   


    })










    
    sock.on("ne", async (nuevoMensaje)=>{

     

       
        const newchat = await chatService.addMessage(nuevoMensaje )
        const newMessage = await chatService.getChat()
        
        
        
        sock.broadcast.emit("new",newMessage)
        sock.emit("new",newMessage)
  

       
       
    })











   
    sock.on("addToCart", async (product)=>{

      
      const email = product.email 
      
      const users = await usersService.verifyEmailUser(email) 
     
      const idUser = new mongoose.Types.ObjectId(users._id)
     
      const productId = new mongoose.Types.ObjectId(product.idProduct) 
      const productById = await productsService.getProducts(productId)
      const f = productById.find( product => product.owner === email )
     
      if(f){
        
            let i = 0
        
      }else{

    
     const productInCartVerify = await cartsService.productInCartVerify( idUser , productId )
      
     if( productInCartVerify ){
      
       let quantity = 1
       const uploadProductQuantity = await cartsService.updateQuantity( idUser , productId , quantity)
       
     }else{
       
       const add = await cartsService.addProduct( idUser , productId )
       
     }


      }
     
     
      
 
   })















   
   sock.on("sendTicket", async (ticket)=>{
   
   const cartArray = []
   const totalArray = []
   const cartUser = await cartsService.cartsByUserId(ticket)
   const user = await usersService.userById(ticket)
   
  
   const cartProducts = cartUser.products
   if(!cartUser){
     throw CustomError.CustomError("ERROR ID","CONTACTAR AL TECNICO",typeError.ERROR_DATOS,"ID DEL TICKET NO ENCONTRADO EN LA BASE DE DATOS")
     
    }
   else{

   
      for (let i = 0 ; i < cartProducts.length ; i++){

      const product = await productsService.productById(cartProducts[i].product)

    
      if( product.stock < cartProducts[i].quantity ){
       let stock = false

      }else{
        
        let id = cartProducts[i].product
        let cantidad =  cartProducts[i].quantity

        
        const reduceStock = await productsService.stockReduce( id, cantidad)

       
        cartArray.push({product : product.title , quantity : cartProducts[i].quantity })
        totalArray.push(parseFloat(cartProducts[i].quantity) * parseFloat(product.price))

      
        let carritoId = cartUser._id
        let productId = cartProducts[i].product
        const deleteProduct = await cartsService.deleteCartProduct(carritoId , productId)

      }

      }
    
  }
   const totalPrice = totalArray.reduce(( acumulador , numero ) => acumulador + numero , 0)
   
   let products = cartArray
   let amount = Math.round(totalPrice)
   let userId = ticket
   let email = user.email
   let purchase_datetime = new Date()



   
   const createTicket = await ticketsService.createTicket( products , amount , userId , email , purchase_datetime )
   sendTicket( email , createTicket._id )
    .then( (data) => { let i = data })
    .catch(error => sendError(error)
             .then((sended) =>{ let i = sended })
             .catch((error) =>{ let i = error }))
  
   })
   














sock.on("rest",async (email)=>{
  const token = "https://backend-new-production.up.railway.app/restablecer/" + generaJWT(email) 
  sendReset(email,token)
  .then(e =>{ let i = e })
  .catch((error)=> sendError(error)
                   .then((sended) =>{ let i = sended })
                   .catch((error) =>{ let i = error }))


})




})



let m = process.env.MONGO_URL || config.MONGO_URL
mongoose.connect(m)
  .then(conn => {let db_connection = conn })
  .catch(error => sendError(error)
  .then((sended) =>{ let i = sended })
  .catch((error) =>{ let i = error }))
