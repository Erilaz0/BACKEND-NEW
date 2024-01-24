const CustomError = require("../../Error/customError")
const typeError = require("../../Error/typeError")
const usersService = require("../../services/users.service")
const moment = require("moment")



CustomError.CustomError()
async function deleteCookiesSession( req , res ){

    try{

      const datos = req.cookies.datos
      let email = datos.email
      const user = await usersService.verifyEmailUser(email)
      let date = moment()
      let specifiedDate = date.format("dddd Do MMMM YYYY")
      date.locale("es")
      
      const lastUserConnection = await usersService.lastConnection( user._id  , specifiedDate )


    }catch{

      let email = null
    }
    req.user = null

    res.clearCookie("premium")
    if(res.clearCookie("premium")){req.logger.debug("cookie premium deleted views.router.js:12")}

    res.clearCookie("admin")
    if(res.clearCookie("admin")){req.logger.debug("cookie admin deleted views.router.js:12")}

    res.clearCookie("datos")
    if(res.clearCookie("datos")){req.logger.debug("cookie datos destruida archivo views.router.js:10")}

    res.clearCookie("current")
    if(res.clearCookie("current")){req.logger.debug("cookie current destruida archivo views.router.js:18")}
    
    res.clearCookie("token")
    if(res.clearCookie("token")){req.logger.debug("cookie token destruida archivo views.router.js:21")}
    
    req.session.destroy((err) => {
      if (err) {
        req.logger.error(CustomError.CustomError("SESSION FAIL","USER SESSION NOT DESTROYED",typeError.ERROR_DATOS,err))
        
      } else {
        req.logger.debug("sesion destruida con exito")
        res.setHeader("location","http://localhost:8080/api/sessions/login")
        res.status(200).redirect("/api/sessions/login");
      }
    });


}

module.exports = deleteCookiesSession