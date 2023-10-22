const Router = require("express").Router
const router = Router()
const path = require("path")
const handleBars = require("express-handlebars")
const fs = require("fs")
const productsModel = require("../models/products.modelo")
const usersModel = require("../models/users.modelo")
const { inicializePassportJWT } = require("../config/jwt.config")
const passport = require("passport")




router.get("/current",passport.authenticate( "current" , { session : false } ) , (req,res)=>{
  let data = req.user.usuario
  res.status(200).render("current",{

    nombre : data.nombre,
    id: data._id,
    email: data.email,
    rol: data.rol,
    token: req.cookies.token


  })
} )


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
    let hola = "h"
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

    res.clearCookie("datos")
    if(res.clearCookie("datos")){console.log("cookie datos destruida archivo views.router.js:95")}

    res.clearCookie("current")
    if(res.clearCookie("current")){console.log("cookie current destruida archivo views.router linea 86")}
    
    res.clearCookie("token")
    if(res.clearCookie("token")){console.log("cookie token destruida archivo views.router linea 81")}
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
      } else {
        console.log("Sesión de usuario destruida con éxito views.router linea 86");
        
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

