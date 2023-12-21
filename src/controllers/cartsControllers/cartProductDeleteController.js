const cartsService = require("../../services/carts.service")



async function cartProductDelete( req , res ){

    const carritoId = req.params.cid
    const productId = req.params.pid
 
    if(carritoId && productId){
 
 
      const carrito = await cartsService.deleteCartProduct( carritoId , productId )
      if(carrito){
        res.status(200).send("producto eliminado")

      }else{

       res.status(400).send("producto no ah sido eliminado")

      }
        

      
      
 
    }
    else{res.status(400).send("failed to delete product")}
 
 


}

module.exports = cartProductDelete