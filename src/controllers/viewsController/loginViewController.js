async function loginView( req , res ){
    let getToken = req.cookies.token
    if(getToken){

        res.status(200).redirect("/api/products")
    }
    res.status(200).render("login")
}

module.exports = loginView