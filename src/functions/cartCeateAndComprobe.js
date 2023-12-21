const cartsService = require(".././services/carts.service")
const cartsModel = require("../dao/models/carts.modelo")
const usersService = require("../services/users.service")


async function cartCreateAndComprobe(email){ 

const getUserByEmail = await usersService.verifyEmailUser( email )
     
if(!getUserByEmail){

   console.log("no se pudo") 

}else{
  
  //verificamos que el carrito exista
     const cartVerify = await cartsService.cartsByUserId(getUserByEmail._id)
  
  //si existe
     if(cartVerify){
        let cart = true
   //     const c = await cartsModel.findOne( cartVerify._id ).populate("idUser") nos trae de la coleccion user un user con el mismo id de su campo idUser, nos trae todos los datos del user
     //   console.log(c)
  //si no existe  
     }else{ 
        
        let idUser = getUserByEmail._id
        const cartCreate = await cartsService.createCart({idUser}) 
    }
}
}


module.exports = cartCreateAndComprobe