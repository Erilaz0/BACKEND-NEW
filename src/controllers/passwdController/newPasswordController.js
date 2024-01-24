const jwt = require("jsonwebtoken")
const usersService = require("../../services/users.service")
const config = require("../../config/config")
const { generaJWT } = require("../../utils")


async function newPassword( req , res ){
    const token = req.params.pid
    let i = process.env.PRIVATE_KEY00 || config.PRIVATE_KEY00
    
    jwt.verify( token , i ,async ( error , credenciales )=>{
    
     if(error){
    
        res.status(401).redirect("/api/sessions/login")
        req.logger.info("Fallo al autenticar Token - newPasswordController.js")
     }
     else{
    
       
       const user = await usersService.verifyEmailUser(credenciales.usuario)
       if(!user){
    
         req.loger.error("Usuario en restablecimiento de password no encontrado")
    
       }else{
         const passResetToken = generaJWT(user.email)
         res.cookie( "token" , passResetToken , { httpOnly : false } )
         res.setHeader("Content-type","text/html")
         res.status(200).render("resPass")
    
       }
     }
    
    })



}


module.exports = newPassword