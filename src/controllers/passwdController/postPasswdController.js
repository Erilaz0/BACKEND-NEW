const usersService = require("../../services/users.service")
const bcrypt = require("bcrypt")


async function passwdResetController( req , res ){

  const { email , password } = req.body

  const user = await usersService.verifyEmailUser(email)
  if(!user){
    req.logger.warn(`Comportamiento Anormal - Usuario no encontrado en passwdResetController`)

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
          else{req.logger.info(`Mensaje postPasswdController.js :  Al usuario Email ${email} no se le ah añadido su contraseña a oldpasswords`)}

        }
        if(arrayOldPasswords.length === 0){
           
            const changePassword = await usersService.newPassword( id , newPassword )
            const addOld = await usersService.addOldPassword( id , newPassword )  
            
            if( changePassword && addOld ){

                res.status(200).redirect("/logout")
            }




        }else{

            let mensaje = "Tu Nueva Contraseña no puede ser igual a las anteriores"
            res.status(200).render("resPass",{
              mensaje : mensaje
            })



        }

       
          }else{
    
            let mensaje = "Tu Nueva Contraseña no puede ser igual a las anteriores"
            res.status(200).render("resPass",{
              mensaje : mensaje
            })



    }

  }


}

module.exports = passwdResetController