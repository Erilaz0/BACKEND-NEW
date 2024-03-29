const productsService = require("../../services/products.service")


async function putProducts( req , res ){

const id = req.params.pid
const productToUpdate = req.body

const update = await productsService.updateProduct(id , productToUpdate)

if(update){  
  
  res.status(200).send("product updated properly")
 }
else{
   
    res.status(400).send("producto no actualizado")
}
}

module.exports = putProducts