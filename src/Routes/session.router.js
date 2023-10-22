const Router = require("express").Router
const router = Router()
const passport = require("passport")
const session = require("express-session")
const usersModel = require("../models/users.modelo")
const bcrypt = require('bcrypt');
const { generaJWT } = require("../utils")
const { validarJWT } = require("../utils")
const jwt = require("jsonwebtoken")
const { json } = require("body-parser")




router.get("/github",passport.authenticate("github",{failureRedirect:"/errorGithub"}),(req,res)=>{




})



router.get("/callbackGithub",passport.authenticate("github",{failureRedirect:"/errorGithub"}), async (req,res)=>{
   
   const token = generaJWT(req.user._id)
           if(token){ 
           
           
           res.cookie( "token", token , { httpOnly : false } )
           
           
           //agregamos a la session en caso de que no haya un registro con github
           }
   
    res.status(200).redirect("/api/products")
    console.log("holaa")
    
    
   
   

      
   
     
  
   


   
   })

router.get("/errorGithub",(req,res)=>{


  res.status(200).send({"error":"fallo al autenticar"})


})



router.post("/register", async (req,res)=>{

    
    const { nombre , apellido ,  email , password } = req.body
    let { edad } = req.body
    
   



    if( !nombre || !email || !password || !apellido  || !edad ){

        res.status(400).send("complete todos los campos")
        
    }else{
     const emailVerification = await usersModel.findOne({email:email})
    
     if(emailVerification){

        res.status(400).send("usuario con ese email ya existe")

     }else{

        let hash = await bcrypt.hash( password , 10 )
        
        edad = parseInt(edad)
        const userCreate = await usersModel.create({nombre , apellido , edad , email , password : hash})
     
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

      const user = await usersModel.findOne({email:email})
      if(!user){
   
      res.status(400).send({message:"usuario no encontrado"}
      
      )}
     else{ 

       let uncryptPassword = await bcrypt.compare( password , user.password ) 
       if(!uncryptPassword){ 
     
       res.status(400).send("usuario no existente")
        
        
        
    }else{/*generamos un token a partir de los datos del ususario, es decir, le damos el ususario (user) para crear el token y q lo firme,
           el token es basicamente los datos q le pasamos codificados en base64, y luego
           en verifyToken lo q hacemos es pasarle el mismo token el cual almacenamos en cookies.token y ahi la funcion verifica el token junto cn la firma
           la cual es uno de los argumentos de la funcion y si el codigo reconoce q el creo el token,lo decodifica si tiene bien la firma
           entre otras cosas que debe de tener la libreria,  te devuelve las credenciales a las cuales estan asociadas
           ese token, es decir, la info decodificada*/
           const token = generaJWT(user)
           if(token){ 
           
           
           res.cookie( "token", token , { httpOnly : false } )
           
           
           //agregamos a la session en caso de que no haya un registro con github
           let datos = { nombre : user.nombre , email : email }
           res.cookie("datos", datos , { httpOnly : false })
         


           
           res.status(200).redirect("/api/products")
}
          
         
        
         }
       }}
    }}

)



module.exports = router