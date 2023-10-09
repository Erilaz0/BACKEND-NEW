const Router = require("express").Router
const router = Router()
const usersModel = require("../models/users.modelo")





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
   
           res.status(200).redirect("/login")
   
        }else{
   
           res.status(400).send("no es posible crear este usuario")
        }
}
}
})


router.post("/", async (req,res)=>{

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