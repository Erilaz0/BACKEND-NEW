const usersService = require("../../services/users.service.js")
const { generaJWT } = require("../../utils.js")
const { generaAdminJWT } = require("../../utils.js")
const bcrypt = require("bcrypt")
const { send } = require("../../mailing/send.js")
const  CustomError  = require("../../Error/customError.js")
const typeError = require("../../Error/typeError.js")

async function login( req , res ){
    
    const { email , password } = req.body
    console.log(`${email} ---- hizo login`)
  


    if(!email || !password){
 
      res.status(400).send("complete todos los campos")
 
 
   }else{
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
          
          const adminData = { email : email }
        
           const adminCookie = generaAdminJWT(adminData)
        
            res.cookie("admin", adminCookie , { httpOnly : true } )
            
             res.status(200).redirect("/realtimeproducts")
 
       }else{ 
 
             const user = await usersService.verifyEmailUser(email)
             if(!user){
             res.set("Usuario no encontrado")
             res.redirect( 400 , "/api/sessions/login" )

             console.log("ususario redirigiendose a login desde loginpostcontroller")
                      }
            else{ 
 
               let uncryptPassword = await bcrypt.compare( password , user.password ) 
               if(!uncryptPassword){ 
      
                res.status(500).redirect("/api/sessions/login")
         
         
         
              }else{/*generamos un token a partir de los datos del ususario, es decir, le damos el ususario (user) para crear el token y q lo firme,
                    el token es basicamente los datos q le pasamos codificados en base64, y luego
                    en verifyToken lo q hacemos es pasarle el mismo token el cual almacenamos en cookies.token y ahi la funcion verifica el token junto cn la firma
                    la cual es uno de los argumentos de la funcion y si el codigo reconoce q el creo el token,lo decodifica si tiene bien la firma
                    entre otras cosas que debe de tener la libreria,  te devuelve las credenciales a las cuales estan asociadas
                    ese token, es decir, la info decodificada*/
                    const premium = await usersService.ispremium(email)
                    if(premium){

                      const token = generaJWT(user)
                      
                      if(token){ 
            
                        //send(email)
                          //.then(d => console.log(d))
                          //.catch(error => console.log(error))
                        
                        res.cookie( "token", token , { httpOnly : false } )
                        res.cookie("premium", true , { httpOnly : false })
           
           //agregamos a la session en caso de que no haya un registro con github
                        let datos = { nombre : user.nombre , email : email , id : user._id}
                        res.cookie("datos", datos , { httpOnly : false })
                        res.set("Succefully Login")
                        res.redirect( 200 , "/api/products" )

                      } else{

                        req.logger.warn(CustomError.CustomError("TOKEN FUNCTION DEPRECATED","TOKEN FUNCTION IS NOT AVIABLE",typeError.ERROR_RECUSO_NO_ENCONTRADO,"THERE'S A FAIL IN JWT GENERATOR FUNCTION"))
            
                      
                      
                      }
                    }else{

                      const token = generaJWT(user)
                      if(token){ 
              
                           //send(email)
                             //.then(d => console.log(d))
                             //.catch(error => console.log(error))
                           
                           res.cookie( "token", token , { httpOnly : false } )
              
              
              //agregamos a la session en caso de que no haya un registro con github
                           let datos = { nombre : user.nombre , email : email , id : user._id}
                           res.cookie("datos", datos , { httpOnly : false })
                           
                           res.set({ nombre : user.nombre , email : email })
                           res.redirect( 200 , "/api/products" )

                              } else{

                                req.logger.warn(CustomError.CustomError("TOKEN FUNCTION DEPRECATED","TOKEN FUNCTION IS NOT AVIABLE",typeError.ERROR_RECUSO_NO_ENCONTRADO,"THERE'S A FAIL IN JWT GENERATOR FUNCTION"))
                    
                               }
                    
                 
                           
           
          
         
          }
        }}
     }


}}

module.exports = login