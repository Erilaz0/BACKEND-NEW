async function registerView( req , res ){
  
  res.setHeader("Content-Type","text/html")
  res.status(200).render("register")
}

module.exports = registerView