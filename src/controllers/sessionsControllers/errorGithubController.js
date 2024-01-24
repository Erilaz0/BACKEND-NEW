async function errGithub( req , res ){
    
    res.setHeader("Content-Type","application/json")
    res.status(200).json({"error":"fallo al autenticar"})

}

module.exports = errGithub