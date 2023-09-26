const Router = require("express").Router
const router = Router()
const path = require("path")
const handleBars = require("express-handlebars")
const fs = require("fs")
const productsModel = require("../models/products.modelo")






router.get("/", async (req,res)=>{
    const products = await productsModel.find().lean()

    res.status(200).render("home",{
        layout: false,
        products:products       

        })

})

router.get("/realtimeproducts", async (req,res)=>{
    const products = await productsModel.find().lean()

    res.status(200).render("realtimeproducts")

})


/*

const products = path.join(__dirname,"..","archivosJson","products.json")

function getProducts(products){

    return  JSON.parse(fs.readFileSync(products))

}


function saveProducts(prod){

      fs.writeFileSync(products,JSON.stringify(prod))


}




router.post("/",(req,res)=>{//funcion que no vamos a usar por que era hacerlo sin router el de los sockets
    const product = getProducts(products)

    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const stock = req.body.stock
    const category = req.body.category
    const code = req.body.code

    const newProducts = {

        title:title,
        price:price,
        description:description,
        stock:stock,
        category:category,
        code:code,
        status:true,
        id: product.length + 1
     
      }
      product.push(newProducts)
      saveProducts(product)




})



*/



module.exports = router

