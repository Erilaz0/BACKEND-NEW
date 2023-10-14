const Router = require("express").Router
const router = Router()
const passport = require("passport")
const session = require("express-session")
const usersModel = require("../models/users.modelo")


router.get("/github",passport.authenticate("github",{failureRedirect:"/errorGithub"}),(req,res)=>{




})



router.get("/callbackGithub",passport.authenticate("github",{failureRedirect:"/errorGithub"}),(req,res)=>{
   
   
   try{
      
      if(req.user.nombre && req.user.email){
      req.session.nombre = req.user.nombre
      req.session.email = req.user.email
      console.log("yess")

    }
  }catch(error){console.log(error)}
   
   

      
   
     
  
   


   
   })

router.get("error",(req,res)=>{


  res.status(200).send({"error":"fallo al autenticar"})


})



router.post("/register", async (req,res)=>{


    const { nombre , email , password } = req.body

    if( !nombre || !email || !password ){

        res.status(400).send("complete todos los campos")
        
    }else{
     const emailVerification = await usersModel.findOne({email:email})
     if(emailVerification){

        res.status(400).send("usuario con ese email ya existe")

     }else{
        const userCreate = await usersModel.create({nombre , email , password})
     
        if(userCreate){
   
           res.status(200).redirect("/api/sessions/login")
   
        }else{
   
           res.status(400).send("no es posible crear este usuario")
        }
}
}
})


router.post("/login", async (req,res)=>{

   const { email , password } = req.body

   if(!email || !password){

     res.status(400).send("complete todos los campos")


   }else{
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){

        res.status(200).redirect("/api/products")
    }else{ 
        
    const login = await usersModel.findOne({email : email , password : password})
    if(login){
        req.session.nombre = login.nombre
        req.session.email = email
        res.status(200).redirect("/api/products")
        
        
       
    }else{
       res.status(400).send("usuario no existente")
        
    }

    }}

})



module.exports = router