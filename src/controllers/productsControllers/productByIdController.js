const productsService = require("../../services/products.service")


async function productById( req , res ){

    const id = req.params.pid
    const products = await productsService.productById(id)
    req.logger.debug("Product By ID")
    
    if(products){ 
      
      res.setHeader("Content-Type" , "application/json")
      res.status(200).json(products)
    
    }else{
     
      res.status(400).send("Producto id " + id + " no encontrado")
      req.logger.info("Producto id " + id + " no encontrado")


    }
}


module.exports = productById