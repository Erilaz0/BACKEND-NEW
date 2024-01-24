const cartsService = require("../../services/carts.service")
const CustomError = require("../../Error/customError")
const typeError = require("../../Error/typeError")

async function cartDelete( req , res ){


    const id = req.params.cid
    const cartDelete = await cartsService.cartDelete(id)
    if ( cartDelete ){
      res.status(200).send("cart deleted")
}
   else{
    
    req.logger.debug("fallo al eliminar el carrito, trate de insertar un id valido")
   
     

   }

  
  
  }
    
      
  


module.exports = cartDelete