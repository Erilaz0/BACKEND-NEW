const Router = require("express").Router
const router = Router()
const fs = require("fs")
const path = require("path")

const products = path.join(__dirname,"..","archivosJson","products.json")
const carrito = path.join(__dirname,"..","archivosJson","carts.json")

function getProducts(pr){


     return JSON.parse(fs.readFileSync(pr,"utf-8"))


}




function getCarro(path){

   return JSON.parse(fs.readFileSync(path,"utf-8"))

}

function saveCart(cart){

    fs.writeFileSync(carrito,JSON.stringify(cart))


}



router.get("/",(req,res)=>{
    
    res.send(getCarro(carrito))
    
 
})


router.get("/:pid",(req,res)=>{
      const product = getProducts(products)
      
      const cart = getCarro(carrito)
      const id = parseInt(req.params.pid)
      
      const findCartById = cart.find(cart => cart.id === id)
      const cartId = findCartById.id
      console.log(cartId)
      if(findCartById){
        
        
        res.status(200).send(findCartById.products)


      }
      else(

        res.status(400).send({error:"id no encontrado"})

      )
      



})


router.post("/",(req,res)=>{

   const newCart = req.body


   if(!newCart.id || !newCart.products || !newCart){

     res.status(400).send("Complete todos los campos de la solicitud")
   }
    else{
       
       const carro = getCarro(carrito)
       newCart.id = carro.length + 1
       carro.push(newCart)
       saveCart(carro)
       res.status(200).send("Producto añadido al carrito")
    }



})



router.post("/:cid/products/:pid",(req,res)=>{


    const cartId = parseInt(req.params.cid)
    const productoId = parseInt(req.params.pid)
    const { quantity } = req.body
    // console.log("cartId: " + cartId + " productoId: " + productoId + " quantity: " + quantity)

    if(!quantity && productoId === 0 && cartId === 0){

       res.status(400).send({error:"invalid data"})

    }else{
       const product = getProducts(products)
       const cart = getCarro(carrito)
       const findCart = cart.find(cart => cart.id === cartId)
       console.log(findCart)
       const cartProducts = findCart.products
       
       const cartProduct = cartProducts.findIndex(item => item.product === productoId)
       console.log(cartProduct + "b")
       if(cartProduct === -1){
         res.status(400).send({error:"producto no encontrado"})

       }else{
         const productQuantity = cartProducts[cartProduct].quantity
         console.log(productQuantity)
         const totalQuantity = quantity + productQuantity
         console.log(totalQuantity)
         console.log(cartProducts[cartProduct])
         cartProducts[cartProduct] = {

            product:productoId,
            quantity: totalQuantity

         }
          saveCart(cart)
          res.status(200).send("carrito modificado exitosamente")
       }

    }
     





})




module.exports = router