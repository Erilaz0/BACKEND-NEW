const  productsServices  = require("../../services/products.service")


async function postProducts( req , res ){
   
    const {title, description, code, price, status, stock, category} = req.body
    
  //  if (!title || !description || !code || !price || !status || !stock || !category) {//si falla el test de post quita esto 
    //   return res.status(400).json({ error: 'Complete all required fields in the body' });
    //}
   
    

    
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

        res.status(201).json({ newProduct });

    }else{

        res.status(400).send("producto no creado")
    }
   




}


module.exports = postProducts