
const cartsService = require("../../services/carts.service")


async function getCarts( req , res){

    const products = await cartsService.getCarts()
    res.status(200).send(products)

}

module.exports = getCarts