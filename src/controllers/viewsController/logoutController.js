const CustomError = require("../../Error/customError")
const typeError = require("../../Error/typeError")



CustomError.CustomError()
async function deleteCookiesSession( req , res ){

    
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
        
        res.redirect("/api/sessions/login");
      }
    });


}

module.exports = deleteCookiesSession