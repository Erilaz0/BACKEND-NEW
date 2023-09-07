const Router = require("express").Router
const router = Router()
const path = require("path")
const handleBars = require("express-handlebars")
const fs = require("fs")






const products = path.join(__dirname,"..","archivosJson","products.json")

function getProducts(products){

    return  JSON.parse(fs.readFileSync(products))

}


function saveProducts(prod){

      fs.writeFileSync(products,JSON.stringify(prod))


}
router.get("/",(req,res)=>{
    const product = getProducts(products)

    res.status(200).render("main",{
        
        products:product       

        })

})

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







module.exports = router

