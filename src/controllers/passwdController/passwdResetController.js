const typeError = require("../../Error/typeError")

async function reset( req , res ){

res.status(200).render("passwdReset")


}

module.exports = reset