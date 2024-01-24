const cartsService = require("../../services/carts.service")



async function cartProductDelete( req , res ){

    const carritoId = req.params.cid
    const productId = req.params.pid
 
    if(carritoId && productId){
 
 
      const carrito = await cartsService.deleteCartProduct( carritoId , productId )
      if(carrito){
        
        res.setHeader( "Content-Type" , "text/plain")
        res.status(200).send("producto eliminado")

      }else{
       
       req.logger.warn("Producto no ah sido Eliminado")

      }
        

      
      
 
    }
    else{res.status(400).send("failed to delete product")}
 
 


}

module.exports = cartProductDelete