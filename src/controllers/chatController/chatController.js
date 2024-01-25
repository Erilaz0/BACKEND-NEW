async function chat( req , res ){

    let email  = req.cookies.datos
    if(email){
        res.setHeader( "Content-Type" , "text/html")
        res.status(200).render("chat",{

            email : email.email
        })
    

    }else{
       
        res.status(400).redirect("/api/sessions/logout")
    }
    
   

}

module.exports = chat