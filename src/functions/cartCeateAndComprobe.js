const cartsService = require(".././services/carts.service")
const cartsModel = require("../dao/models/carts.modelo")
const usersService = require("../services/users.service")


async function cartCreateAndComprobe(email){ 

const getUserByEmail = await usersService.verifyEmailUser( email )
     
if(!getUserByEmail){

   return

}else{
  

     const cartVerify = await cartsService.cartsByUserId(getUserByEmail._id)
  

     if(cartVerify){
        
      let i = 0

     }else{ 
        
        let idUser = getUserByEmail._id
        const cartCreate = await cartsService.createCart({idUser}) 
        if(cartCreate){

         let i = 0
  
       }else{ 
   
         let i = 0
        }
    }
}
}


module.exports = cartCreateAndComprobe