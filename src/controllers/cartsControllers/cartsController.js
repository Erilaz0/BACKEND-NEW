const cartsService = require("../../services/carts.service")
const productsService = require("../../services/products.service")
const usersService = require("../../services/users.service")


async function getCarts( req , res){
   
    
    const carts = await cartsService.getCarts()
    if(carts){
        res.status(200).json({carts})

    }else{

        req.logger.info("No se han Encontrado Carritos en la DB ")
    }
    
    
  

    

}

module.exports = getCarts