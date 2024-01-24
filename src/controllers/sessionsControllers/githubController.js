const {generaJWT} = require("../../utils.js")

async function githubLogin( req , res){

    const token = generaJWT(req.user._id)
    if(token){ 
    
    
    res.cookie( "token", token , { httpOnly : false } )
    res.status(200).redirect("/api/products")
    
    
    
    }

    



}

module.exports = githubLogin