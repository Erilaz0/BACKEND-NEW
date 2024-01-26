const productsService = require("../../services/products.service")



async function deleteProduct( req , res ){

    const id = req.params.pid
    
    const productDeleted = await productsService.deleteProduct(id)
    if(productDeleted){

      req.logger.info("product deleted")
      return res.status(200).send("product deleted")
     
 

    }
    else{
      req.logger.info("Producto id: " + id + "no existe")
      return res.status(400).send("Producto id: " + id + "no existe")
      
      

     


    }




}




module.exports = deleteProduct