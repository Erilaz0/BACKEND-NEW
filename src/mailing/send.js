const nodemailer = require("nodemailer")
const  config  = require("../config/config")

const transporter = nodemailer.createTransport({

   service : config.SERVICE, 
   port : config.MAILINGPASSWORD , 
   auth : {

     user: config.MAILINGUSER,
     pass : config.MAILINGPASSWORD

   },
   tls: {
    rejectUnauthorized: false, // Configuración para aceptar certificados autofirmados
  },

})

const send = async(email) => {

    return transporter.sendMail({
        
    from : "Erilaz <alonsoalonsl431432@gmail.com>",
    to : email ,
    subject : "hubo un nuevo inicio de sesion en tu cuenta de icommerce",
    html: `<h1> u are a boss bitch</h1>`
})

    

}

const sendReset = async(email , message) => {

  return transporter.sendMail({
      
  from : "Erilaz <alonsoalonsl431432@gmail.com>",
  to : email ,
  subject : "correo de prueba de recueracion de constraseña",
  html: `<a href=${message}>link para el reseteo</a>`
})

  

}
module.exports =  { send , sendReset }