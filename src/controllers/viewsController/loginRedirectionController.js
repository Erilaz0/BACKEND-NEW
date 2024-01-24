async function loginRedirection( req , res){
    
    res.setHeader("location","https://backend-new-production.up.railway.app/api/sessions/login")
    res.status(200).redirect("/api/sessions/login")

}

module.exports = loginRedirection