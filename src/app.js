const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const inicializaPassport = require("./config/passport.config")
const inicializePassportJWT = require("./config/jwt.config")

const comun = require("./Routes/comun.router")
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
const ticketsModelo = require("./dao/models/tickets.modelo")
const ticketsService = require("./services/tickets.service")
const { serverConfig } = require("./functions/serverConfig.js")
const test = require("./functions/testingMongo")
const errorHandler = require("./Error/errorHandler")
const CustomError  = require("./Error/customError.js")
const typeError = require("./Error/typeError.js")


const { generaJWT } = require("./utils.js")
const { sendReset } = require("./mailing/send.js")
//seleccionamos la persistencia a traves del arranque del servidor
serverConfig()

//al ya haber creado los productos no tengo mas opcion q usar mocks en un testing
//se q el testing se hace en diferentes condiciones pero al usar asincronia, jest rechazaba este testing debido
//a el tiempo de espera, asi que lo use en este caso para asegurar la correcta funcionalidad de usersService ya que
//es el primer servicio en ser utilizado

//test()
//style="margin : 3% ;width: 100%; height: auto; display: flex; flex-direction: row; flex-wrap: wrap; text-align : center"


PORT= parseInt(config.PORT)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());//si le ponemos un string aca lo toma como la firma de las cookies y luego solo hay q
                        //establecer las cookies en signed : true

// Parse application/json


app.engine("handlebars", handleBars.engine())
app.set("views", __dirname + "\\views");
app.set("view engine","handlebars")

app.use(session({// revisar esto y el uso de req.sessions
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
app.use("/api/sessions/", sessions_ )
app.use("/mockingproducts",mocking )
app.use("/loggerTest", logger )
app.use("/",comun)
app.use( "/restablecer" , passwdReset )
app.use("/api/users/premium" , premium )


const serverExpress = app.listen(PORT,()=>{



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
    sock.on("deleted", async (idProduct) => {

     const id = idProduct.id
    
     if( !idProduct.email ){
       
      return await productsService.deleteProduct( id )
      
     }else{ 
      const email = idProduct.email
       
      const product = await productsService.productById( id )

      if( email === product.owner){
 
       const deletProduct = await productsService.deleteProduct( id )
 
 
      }else{
 
       return
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
      const f = productById.find(product => product.owner === email)
     
      if(f){
        
            return
        
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

      //le decimos que si el stock del producto es menor a la cantidad del producto en el carrito, que no haga nada y quede en el carrito
      if(product.stock < cartProducts[i].quantity){
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
  
   })
   














sock.on("rest",async (email)=>{
  const token = "http:localhost:8080/restablecer/" + generaJWT(email) 
  sendReset(email,token)
  .then(e =>{ console.log(e)})
  .catch((error)=>{console.log(error)})


})




})




mongoose.connect(config.MONGO_URL)
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