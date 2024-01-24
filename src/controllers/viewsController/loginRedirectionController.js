async function loginRedirection( req , res){
    
    res.setHeader("location","http://localhost:8080/api/sessions/login")
    res.status(200).redirect("/api/sessions/login")

}

module.exports = loginRedirection