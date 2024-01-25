async function loginRedirection( req , res){
    
    
    res.status(200).redirect("/api/sessions/login")

}

module.exports = loginRedirection