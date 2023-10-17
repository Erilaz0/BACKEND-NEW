const Router = require("express").Router
const router = Router()
const path = require("path")
const handleBars = require("express-handlebars")
const fs = require("fs")
const productsModel = require("../models/products.modelo")
const usersModel = require("../models/users.modelo")







router.get("/api/products", async (req,res)=>{
    const products = await productsModel.find().lean()
    const {_id} = req.session.data
    console.log(_id)
    const users = await usersModel.findOne({_id:_id})
    res.status(200).render("home",{
        layout: false,
        products:products,       
        nombre: users.nombre,
        email:users.email

        })

})

router.get("/realtimeproducts", async (req,res)=>{
    const products = await productsModel.find().lean()

    res.status(200).render("realtimeproducts")

})






router.get("/api/sessions/login",(req,res)=>{

    res.status(200).render("login")

})






router.get("/register",(req,res)=>{
    
    
    res.status(200).render("register")
    
 
 })
 






 router.get("/profile",(req,res)=>{


    res.status(200).render("profile")
 
 })




 router.get("/logout", (req, res) => {
    req.user = null
    console.log("req.user = " + req.user)
   
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
      } else {
        console.log("Sesión de usuario destruida con éxito.");
        
        res.redirect("/api/sessions/login");
      }
    });
  });
  

router.get("/",(req,res)=>{

  res.redirect("/api/sessions/login")


})




















/*

const products = path.join(__dirname,"..","archivosJson","products.json")

function getProducts(products){

    return  JSON.parse(fs.readFileSync(products))

}


function saveProducts(prod){

      fs.writeFileSync(products,JSON.stringify(prod))


}

*/




module.exports = router

