const cartsService = require("../../services/carts.service")



async function cartUpdate( req , res ){


    const cartId = req.params.cid
    const productoId = req.params.pid
    const quantity = parseInt(req.body.quantity)
    console.log(quantity)

    if(!quantity && productoId === 0 && cartId === 0){

       res.status(400).send({error:"invalid data"})

    }else{
       
      const updateProductQuantity = await cartsService.updateQuantity( cartId , productoId , quantity)
      if(updateProductQuantity){
          const cart = await cartsService.getCarts({_id : cartId})
          
          res.status(200).json(cart)
          

         }
         
         else{
            res.status(400).send("error")
         }
     }    



}

module.exports = cartUpdate