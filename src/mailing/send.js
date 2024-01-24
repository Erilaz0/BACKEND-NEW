const nodemailer = require("nodemailer")
const  config  = require("../config/config")

const transporter = nodemailer.createTransport({

   service : process.env.SERVICE || config.SERVICE, 
   port : process.env.MAILINGPASSWORD || config.MAILINGPASSWORD , 
   auth : {

     user: process.env.MAILINGUSER || config.MAILINGUSER,
     pass : process.env.MAILINGPASSWORD ||config.MAILINGPASSWORD

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

const sendDeletedProductAdvice = async( email , title )=>{

  return transporter.sendMail({

    from : "Erilaz <alonsoalonsl431432@gmail.com>",
    to : email ,
    subject : "Uno de tus productos creados ah sido  eliminado",
    html: `<a>Tu producto de nombre : ${title} ah sido eliminado de ErilazIcommerce </a>`

  })

}

const sendDeletedUserAdvice = async( email , date )=>{

  return transporter.sendMail({

    from : "Erilaz <alonsoalonsl431432@gmail.com>",
    to : email ,
    subject : "Usuario Eliminado",
    html: `<a>Lamentamos Informarle que su cuenta en ErilazIcommerce ${email} ah expirado por tiempo de inactividad - Ultima conexion : ${date} </a>`

  })

}

const sendTicket = async( email , id )=>{

  return transporter.sendMail({

    from : "Erilaz <alonsoalonsl431432@gmail.com>",
    to : email ,
    subject : "Gracias por comprar en ErilazShop!",
    html: `<p>El id de su ticket de compra es ${id}</p>`

  })

}
module.exports =  { send , sendReset , sendDeletedProductAdvice , sendDeletedUserAdvice , sendTicket }