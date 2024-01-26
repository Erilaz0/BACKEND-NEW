const  productsServices  = require("../../services/products.service")


async function postProducts( req , res ){
   
    const {title, description, code, price, status, stock, category} = req.body
    
   
   
    

    
    const newProduct = {
        title,
        description,
        code, 
        price, 
        status,
        stock,
        category,
        

          }

    const productCreate = await productsServices.createProduct(newProduct)

    if(productCreate){
    try{
        req.logger.info("producto creado")
        return res.status(201).json({ newProduct });

    }catch{req.logger.info("producto no creado")}
       

    }else{
        req.logger.info("producto no creado")
       
        return res.status(400).send("producto no creado")
       
        
    }
   




}


module.exports = postProducts