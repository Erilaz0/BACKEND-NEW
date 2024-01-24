const jwt = require("jsonwebtoken")
const passport = require("passport")


const config = require("./config/config")

//funcion para codificara los datos y firmarlos
const generaJWT = ( usuario ) => jwt.sign ( { usuario } , config.PRIVATE_KEY00 , { expiresIn : "1h" } )

const generaAdminJWT = ( admin ) => jwt.sign ( { admin } , config.PRIVATE_KEY01 , { expiresIn : "1h"} )

const validarJWT = ( req , res , next ) =>{
        
        
         
        let getToken = req.cookies.token
        if( !getToken ){
            res.setHeader("location","http://localhost:8080/logout")
            res.status(400).redirect("/api/sessions/login")
            return
          
          }

          
          
        
       
        
        //verifica el token junto con la private_key , es decir, la firma
        jwt.verify( getToken , config.PRIVATE_KEY00 , ( error , credenciales ) => {
          if( error ){
              res.setHeader("location","http://localhost:8080/logout")
              res.status(400).redirect("/logout")
            }else{
               
              let i = 0
             
            }
          


          next()

        })
}



const validarAdminJWT = ( req , res , next )=>{

   let admin = req.cookies.admin 
   if(!admin){
    const premiumUser = req.cookies.premium
    if( premiumUser ){

      const token = req.cookies.token
      if(token){


        jwt.verify( token , config.PRIVATE_KEY00 , (error , credenciales)=>{
          if(error){
            res.setHeader("location","http://localhost:8080/logout")
            res.status(400).redirect("/logout")
   
          }else{
            
            let i=0
   
          }
   
          next()
   
        })


      }


   



    }else{


         res.setHeader("location","http://localhost:8080/logout")
         res.status(400).redirect("/logout")    }

   }else{
   
     jwt.verify( admin , config.PRIVATE_KEY01 , (error , credenciales)=>{
       if(error){
         res.setHeader("location","http://localhost:8080/logout")
         res.status(400).redirect("/logout")

       }else{

       let i = 0

       }

       next()

     })

   }
   


}


module.exports = { generaJWT , validarJWT , generaAdminJWT , validarAdminJWT } 




