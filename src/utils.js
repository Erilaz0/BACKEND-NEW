const jwt = require("jsonwebtoken")
const passport = require("passport")


const PRIVATE_KEY = "secretPassword"

//funcion para codificara los datos y firmarlos
const generaJWT = ( usuario ) => jwt.sign ( { usuario } , PRIVATE_KEY , { expiresIn : "1h" } )

const validarJWT = ( req , res , next ) =>{
        
        
        
        let getToken = req.cookies.token
        if( !getToken ){console.log("no existe la cookie token utils.js:11")}
        
       // let data = JSON.parse(getToken)
       // let jwtArgument = data.sessionToken
        
        //verifica el token junto con la private_key , es decir, la firma
        jwt.verify( getToken , PRIVATE_KEY , ( error , credenciales ) => {
          if( error ){
              
              console.log("acceso === false utils.js:24")
            }else{
               
              console.log("credenciales obtenidas utils.js:27") 
             
            }
          


          next()

        })
}



module.exports = { generaJWT , validarJWT , PRIVATE_KEY } 




