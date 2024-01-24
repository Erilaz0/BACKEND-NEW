const cartsService = require("../../services/carts.service")


async function cartCreate( req , res){

    const newCart = req.body
    const insertCart = await cartsService.createCart(newCart)
 
    if(insertCart){
       res.setHeader( "Content-Type" , "application/json")
       res.status(200).json(newCart)
    }
     else{
       res.setHeader( "Content-Type" , "text/plain")
       res.status(400).send("error al crear producto")
        
     }
 

     
}

module.exports = cartCreate