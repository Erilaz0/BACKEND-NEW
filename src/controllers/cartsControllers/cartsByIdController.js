const cartsService = require("../../services/carts.service")
const usersService = require("../../services/users.service")
const productsService= require("../../services/products.service")



async function cartById( req , res ){

    const id = req.params.pid
      
    
    const user = await usersService.userById(id)
    if(user){
        
        const idUser = user._id
        const cart = await cartsService.cartsByUserId(idUser)
        
        const cartInfo = cart.products
        const cartArray = []
        const precioTotal = []
        for( let i = 0 ; i < cartInfo.length ; i++){

            const product = await productsService.productById(cartInfo[i].product)
            cartArray.push({product : product.title , quantity : cartInfo[i].quantity , price : parseFloat(cartInfo[i].quantity) * parseFloat(product.price)})  
            precioTotal.push(parseFloat(cartInfo[i].quantity) * parseFloat(product.price))

        }
                   
        const total = precioTotal.reduce( ( acumulador , numero ) => acumulador + numero , 0 )
        
     


        res.setHeader( "Content-Type" , "text/html")
        res.status(200).render("carts",{

        cartInfo: cartArray,
        totalPrice : Math.round(total),
        id : idUser
        


        })
        
    }
     else{

        req.logger.debug(`no se ah Encontrado un usuario con ID : ${id}`)
     }

}

module.exports = cartById