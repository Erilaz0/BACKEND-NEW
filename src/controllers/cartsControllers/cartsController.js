const cartsService = require("../../services/carts.service")
const productsService = require("../../services/products.service")
const usersService = require("../../services/users.service")


async function getCarts( req , res){
   
    
    const carts = await cartsService.getCarts()
    res.status(200).json({carts})
    
  

    

}

module.exports = getCarts