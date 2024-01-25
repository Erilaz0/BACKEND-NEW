const jwt = require("jsonwebtoken")
const passport = require("passport")


const config = require("./config/config")

//funcion para codificara los datos y firmarlos
let a = process.env.PRIVATE_KEY00 || config.PRIVATE_KEY00
let b = process.env.PRIVATE_KEY01 || config.PRIVATE_KEY01



const generaJWT = ( usuario ) => jwt.sign ( { usuario } , a , { expiresIn : "1h" } )

const generaAdminJWT = ( admin ) => jwt.sign ( { admin } , b , { expiresIn : "1h"} )

const validarJWT = ( req , res , next ) =>{
        
        
         
        let getToken = req.cookies.token
        if( !getToken ){
            
            res.status(400).redirect("/api/sessions/login")
            return
          
          }

          
          
        
       
        
        //verifica el token junto con la private_key , es decir, la firma
        jwt.verify( getToken , a , ( error , credenciales ) => {
          if( error ){
              
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


        jwt.verify( token , a , (error , credenciales)=>{
          if(error){
            
            res.status(400).redirect("/logout")
   
          }else{
            
            let i=0
   
          }
   
          next()
   
        })


      }


   



    }else{


        
         res.status(400).redirect("/logout")    }

   }else{
   
     jwt.verify( admin , b , (error , credenciales)=>{
       if(error){
       
         res.status(400).redirect("/logout")

       }else{

       let i = 0

       }

       next()

     })

   }
   


}


module.exports = { generaJWT , validarJWT , generaAdminJWT , validarAdminJWT } 




