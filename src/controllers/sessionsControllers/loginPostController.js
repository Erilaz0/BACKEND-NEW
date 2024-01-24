const usersService = require("../../services/users.service.js")
const { generaJWT } = require("../../utils.js")
const { generaAdminJWT } = require("../../utils.js")
const bcrypt = require("bcrypt")
const { send } = require("../../mailing/send.js")
const  CustomError  = require("../../Error/customError.js")
const typeError = require("../../Error/typeError.js")
const moment = require("moment")

async function login( req , res ){
    
    const { email , password } = req.body
    req.logger.info(`${email} ---- hizo login`)
    
    
  


    if(!email || !password){
 
      res.setHeader("location","https://backend-new-production.up.railway.app/api/sessions/register")
      res.status(400).redirect("/api/sessions/register")
 
 
   }else{
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
           req.logger.info(`${email} ---- admin`)
           const adminData = { email : email }
        
           const adminCookie = generaAdminJWT(adminData)
           res.cookie("admin", adminCookie , { httpOnly : true } )
           res.status(200).redirect("/realtimeproducts")
 
       }else{ 
        req.logger.info(`${email} no es admin`)
             const user = await usersService.verifyEmailUser(email)
             if(!user){
            
             req.logger.info("Usuario no encontrado")
             res.status( 400 ).redirect("/api/sessions/login")
            
            }else{ 
              req.logger.info(`${email} ---- encriptando contraseña`)
               let uncryptPassword = await bcrypt.compare( password , user.password ) 
               if(!uncryptPassword){ 
      
                res.status(500).redirect("/api/sessions/login")
         
         
         
              }else{

                    const premium = await usersService.ispremium(email)
                    if(premium){
                      let date = moment()
                      let dates = date.format("dddd Do MMMM YYYY")
                      date.locale("es")
                      
                      
                      
                      const lastConnection = await usersService.lastConnection( user._id , dates )
                      const token = generaJWT(user)
                      
                      
                      
                      if(token){ 
                        
            
                        send(email)
                          .then(d => console.log(d))
                          .catch(error => console.log(error))
                        
                        res.cookie( "token", token , { httpOnly : false } )
                        res.cookie("premium", true , { httpOnly : false })
           
          
                        let datos = { nombre : user.nombre , email : email , id : user._id}
                        res.cookie("datos", datos , { httpOnly : false })
                        res.setHeader("location","https://backend-new-production.up.railway.app/api/products")
                        res.status(200).redirect("/api/products")

                      } else{

                        req.logger.warn(CustomError.CustomError("TOKEN FUNCTION DEPRECATED","TOKEN FUNCTION IS NOT AVIABLE",typeError.ERROR_RECUSO_NO_ENCONTRADO,"THERE'S A FAIL IN JWT GENERATOR FUNCTION"))
            
                      
                      
                      }
                    }else{
                      req.logger.info(`${email} ---- hiz`)
                      let date = moment()
                      let dates = date.format("dddd Do MMMM YYYY")
                      
                      date.locale("es")
                      const lastConnection = await usersService.lastConnection( user._id , dates )

                      const token = generaJWT(user)
                      if( token && lastConnection ){ 
                        
                         // send(email)
                           //  .then(d => console.log(d))
                            // .catch(error => console.log(error))
                           
                          res.cookie( "token", token , { httpOnly : false } )
                          
                          let datos = { nombre : user.nombre , email : email , id : user._id}
                          res.cookie("datos", datos , { httpOnly : false })
                          req.logger.info(`${email} ---- redirigiendo a /api/products`)
                          res.status(200).redirect("/api/products")

                              }else{

                                req.logger.warn(CustomError.CustomError("TOKEN FUNCTION DEPRECATED","TOKEN FUNCTION IS NOT AVIABLE",typeError.ERROR_RECUSO_NO_ENCONTRADO,"THERE'S A FAIL IN JWT GENERATOR FUNCTION"))
                    
                               }
                    
                 
                           
           
          
         
          }
        }}
     }


}}

module.exports = login