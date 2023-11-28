async function loggerTest( req , res ){

res.status(200).send("si aparecen todas desde info hasta error es q produccion esta bien en entorno de produccion , y si aparecen todas desde debug hasta error es q esta bien en entorno de produccion ")
    req.logger.error("error logger")
    req.logger.warn("warn logger") 
    req.logger.info("info logger") 
    req.logger.verbose("info verbose")
    req.logger.debug("info debug")
    req.logger.silly("info silly")


}

module.exports = loggerTest