const Router = require("express").Router
const router = Router()
const fs = require("fs")
const path = require("path")
const cartsModelo = require("../models/carts.modelo.js")
const cartsModel = require("../models/carts.modelo.js")




//const products = path.join(__dirname,"..","archivosJson","products.json")
//const carrito = path.join(__dirname,"..","archivosJson","carts.json")

/* function getProducts(pr){


     return JSON.parse(fs.readFileSync(pr,"utf-8"))


}




function getCarro(path){

   return JSON.parse(fs.readFileSync(path,"utf-8"))

}

function saveCart(cart){

    fs.writeFileSync(carrito,JSON.stringify(cart))


}

*/

router.get("/", async ( req , res  )=>{
    const products = await cartsModelo.find() 
    res.status(200).send(products)
    
 
})


router.get("/:pid", async (req,res)=>{
      const id = req.params.pid
      
      const productById = await cartsModelo.find({_id:id})
      if(productById){
        
        
        res.status(200).send(productById)


      }
      else(

        res.status(400).send({error:"id no encontrado"})

      )
      



})


router.post("/", async (req,res)=>{

   const newCart = req.body
   const insertCart = await cartsModelo.create(newCart)

   if(insertCart){

      res.status(200).send("Producto Añadido")
   }
    else{
       
      res.status(400).send("error al crear producto")
       
    }



})



router.put("/:cid/products/:pid", async (req,res)=>{


    const cartId = req.params.cid
    const productoId = req.params.pid
    const quantity = parseInt(req.body.quantity)
    console.log(quantity)

    if(!quantity && productoId === 0 && cartId === 0){

       res.status(400).send({error:"invalid data"})

    }else{
       
      const updateProductQuantity = await cartsModelo.updateOne({ _id : cartId , "products.product" : productoId},{$inc:{"products.$.quantity": quantity}})
      if(updateProductQuantity){

          res.status(200).send("Cantidad actualizada correctamente")

         }
         
         else{
            res.status(400).send("error")
         }
     }    
})


router.delete("/:cid/products/:pid", async ( req , res )=>{
   const carritoId = req.params.cid
   const productId = req.params.pid

   if(carritoId && productId){


     const carrito = await cartsModel.updateOne( { _id : carritoId } , {$pull : {products : {product : productId}}} )
     res.status(200).send("yess you did it¡")

   }
   else{res.status(400).send("failed to delete product")}




})


router.delete("/:cid", async ( req , res ) => {

   const cartId = req.params.cid
   const cartDelete = await cartsModel.deleteOne( { _id : cartId } )
   if ( cartDelete ){
      res.status(200).send("cart deleted")
      


   }
   else{

      res.status(400).send("failed to delete cart")


   }
  


})



module.exports = router