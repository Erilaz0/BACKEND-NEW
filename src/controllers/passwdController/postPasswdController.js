const usersService = require("../../services/users.service")
const bcrypt = require("bcrypt")


async function passwdResetController( req , res ){

  const { email , password } = req.body

  const user = await usersService.verifyEmailUser(email)
  if(!user){
   let a = 0

  }else{
    let id = user._id
    
    const hashedPasswd = await bcrypt.compare( password , user.password)
   
    if( !hashedPasswd){

        let newPassword = await bcrypt.hash( password , 10 )
        const userPasswords = user.oldpasswords
        
        let arrayOldPasswords = []

        for( let i = 0 ; i < userPasswords.length ; i++ ){

          let passwd = await bcrypt.compare( password , userPasswords[i].password)
          if(passwd){ arrayOldPasswords.push(passwd)}

        }
        if(arrayOldPasswords.length === 0){
           
            const changePassword = await usersService.newPassword( id , newPassword )
            const addOld = await usersService.addOldPassword( id , newPassword )  
            
            if( changePassword && addOld ){

                res.status(200).redirect("/logout")
            }




        }else{


            res.status(200).send("tu contraseña no puede ser igual a tus contraseña anteriores")



        }

       
          }else{
    
        res.status(200).send("tu contraseña no puede ser igual a la de antes - tu contraseña ultima era la misma q esta")



    }

  }


}

module.exports = passwdResetController