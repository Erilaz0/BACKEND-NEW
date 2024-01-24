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
const image = require("./Routes/image.router.js")

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
const { sendReset, sendDeletedProductAdvice, sendTicket } = require("./mailing/send.js")
//seleccionamos la persistencia a traves del arranque del servidor
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
app.use(cookieParser());//si le ponemos un string aca lo toma como la firma de las cookies y luego solo hay q
app.use(cors())                        //establecer las cookies en signed : true
app.use('/uploads', express.static('uploads'));
// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "/views");
app.set("view engine","handlebars")

app.use(session({// revisar esto y el uso de req.sessions
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
app.use("/",handler) //views
app.use("/chat",chat)
app.use("/api/sessions/", sessions_ )
app.use("/mockingproducts",mocking )
app.use("/loggerTest", logger )
app.use( "/restablecer" , passwdReset )
app.use("/api/users" , premium )
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(specs))
app.use("/image",image)





const serverExpress = app.listen( PORT , "0.0.0.0" ,()=>{



    console.log("server corriendo en el puerto: " + PORT )
})


//seccion de sockets, en la siguiente seccion se maneja logica CRUD, 

const serverSocket = new s(serverExpress)
serverSocket.on("connection", sock => {

    
    //agregamos neuvo producto
    sock.on("newProduct", async( agregarProducto ) =>{
    
    const newP = await productsService.createProduct(agregarProducto)
    
    })











    //eliminamos un producto por su id
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
        .catch(console.log("no se ah enviado el avsio de eliminacion del producto"))


      

      }
      
      
      
     }else{ 
      
      const email = idProduct.email
      const product = await productsService.productById( id )

      if( email === product.owner){
       
        let ownerEmail = product.owner
        sendDeletedProductAdvice( ownerEmail , product.title  )
        .then( async(data) => { return await productsService.deleteProduct( id ) })
        .catch(console.log("oh no"))
 
      
 
 
      }else{
 
       let i = 0
      }
   

     }
   


    })










    //añadimos mensajes al chat en la db y lo enviamos al chat en la UI
    sock.on("ne", async (nuevoMensaje)=>{

     

       
        const newchat = await chatService.addMessage(nuevoMensaje )
        const newMessage = await chatService.getChat()
        
        
        
        sock.broadcast.emit("new",newMessage)
        sock.emit("new",newMessage)
  

       
       
    })











    //añadimos un producto al carrito
    sock.on("addToCart", async (product)=>{

      
      const email = product.email //obtenemos el email ya que queremos el id del usuario que agrego un producto al carrito
      
      const users = await usersService.verifyEmailUser(email) //obtenemos al usuario
     
      const idUser = new mongoose.Types.ObjectId(users._id) // obtenemos el id del usuario para buscar su carrito
     
      const productId = new mongoose.Types.ObjectId(product.idProduct) //id del prdoucto a agregar
      const productById = await productsService.getProducts(productId)
      const f = productById.find( product => product.owner === email )
     
      if(f){
        
            let i = 0
        
      }else{

     //verificar si el producto ya existe en el carrito
     const productInCartVerify = await cartsService.productInCartVerify( idUser , productId )
      
     if( productInCartVerify ){
       //si existe aumentamos su cantidad en uno
       let quantity = 1
       const uploadProductQuantity = await cartsService.updateQuantity( idUser , productId , quantity)
       
     }else{
       //si no existe lo añadimos al carrito
       const add = await cartsService.addProduct( idUser , productId )
       
     }


      }
     
     
      
 
   })















   //aca nos llega el id del cliente q finalizo su compra nose llega desde la vista del carrito
   sock.on("sendTicket", async (ticket)=>{
   //buscamos el carrito con el id asociado al usuario
   const cartArray = []
   const totalArray = []
   const cartUser = await cartsService.cartsByUserId(ticket)
   const user = await usersService.userById(ticket)
   
   //accedemos a products
   const cartProducts = cartUser.products
   if(!cartUser){
     throw CustomError.CustomError("ERROR ID","CONTACTAR AL TECNICO",typeError.ERROR_DATOS,"ID DEL TICKET NO ENCONTRADO EN LA BASE DE DATOS")
     //enviar mail, no seria normal que en este punto en el que se crea el ticket del carrito el id del usuario no
     //fuera encontrado en la DB , aparte del mail deberiamos de hacer un redirect hacia logout
    }
   else{

      //añadimos el nombre de cada producto y su cantidad a un array
      //añadimos todos los precios de los productos sumados con sus respectivas cantidades a un array
      for (let i = 0 ; i < cartProducts.length ; i++){

      const product = await productsService.productById(cartProducts[i].product)

      //si el stock del producto no es suficiente para completar la compra, no hacemos nada, el producto no se añade al ticket
      if( product.stock < cartProducts[i].quantity ){
       let stock = false

      }else{
        //obtenemos los parametros para reducir el stock del producto
        let id = cartProducts[i].product
        let cantidad =  cartProducts[i].quantity

        //reducimos el stock del producto
        const reduceStock = await productsService.stockReduce( id, cantidad)

        //agregamos a los arrays q usaremos para hacer el ticket y obtener la suma total de la compra
        cartArray.push({product : product.title , quantity : cartProducts[i].quantity })
        totalArray.push(parseFloat(cartProducts[i].quantity) * parseFloat(product.price))

        //eliminamos el producto del carrito ya que finalizo la compra
        let carritoId = cartUser._id
        let productId = cartProducts[i].product
        const deleteProduct = await cartsService.deleteCartProduct(carritoId , productId)

      }

      }
    
  }//obtenemos el precio total de todos los productos
   const totalPrice = totalArray.reduce(( acumulador , numero ) => acumulador + numero , 0)
   // guardamos en variables los datos que seran pasados como parametro para la creacion del ticket
   let products = cartArray
   let amount = Math.round(totalPrice)
   let userId = ticket
   let email = user.email
   let purchase_datetime = new Date()



   
   const createTicket = await ticketsService.createTicket( products , amount , userId , email , purchase_datetime )
   sendTicket( email , createTicket._id )
    .then( (data) => {console.log(data) })
    .catch(console.log("no se ah avisado al usuario de la creacion d su"))
  
   })
   














sock.on("rest",async (email)=>{
  const token = "http://localhost:8080/restablecer/" + generaJWT(email) 
  sendReset(email,token)
  .then(e =>{ console.log(e)})
  .catch((error)=>{console.log(error)})


})




})



let m = process.env.MONGO_URL || config.MONGO_URL
mongoose.connect(m)
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