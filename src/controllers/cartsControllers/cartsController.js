const cartsService = require("../../services/carts.service")
const productsService = require("../../services/products.service")
const usersService = require("../../services/users.service")


async function getCarts( req , res){
   
    let data = req.cookies.datos
    
    
    let email = data.email
    

    const user = await usersService.verifyEmailUser(email)
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
        
     



        res.status(200).render("carts",{

        cartInfo: cartArray,
        totalPrice : Math.round(total),
        id : idUser
        


        })
        
    }

    

}

module.exports = getCarts