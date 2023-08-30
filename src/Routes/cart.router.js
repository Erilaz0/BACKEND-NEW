const Router = require("express").Router
const router = Router()
const fs = require("fs")
const path = require("path")

const products = path.join(__dirname,"..","archivosJson","products.json")
const carrito = path.join(__dirname,"..","archivosJson","carts.json")




function getCarro(path){

   return JSON.parse(fs.readFileSync(path,"utf-8"))

}

function saveCart(cart){

    fs.writeFileSync(carrito,JSON.stringify(cart))


}



router.get("/",(req,res)=>{
    
    res.send(getCarro(carrito))
    

})



router.post("/",(req,res)=>{

   const newCart = req.body


   if(!newCart.id || !newCart.products || !newCart){

     res.status(400).send("Complete todos los campos de la solicitud")
   }
    else{

       const carro = getCarro(carrito)
       carro.push(newCart)
       saveCart(carro)
       res.status(200).send("Producto añadido al carrito")
    }



})


module.exports = router