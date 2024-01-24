async function profile( req , res ){
    const userData = req.cookies.datos
    if(userData){

        res.setHeader("Content-Type","application/json")
        res.status(200).render("profile")

    }else{

        req.logger.debug("NO se puede acceder a cookie - datos . profileController.js")
    }

   

}

module.exports = profile