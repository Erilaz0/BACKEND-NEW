const Router = require("express").Router
const router = Router()
const reset = require("../controllers/passwdController/passwdResetController")
const newPassword = require("../controllers/passwdController/newPasswordController")
const postPasswdCotroller = require("../controllers/passwdController/postPasswdController")
const { validarJWT } = require("../utils")

const loggerMid = require("../functions/winstone") 



router.get( "/" , loggerMid , reset )


router.get( "/:pid" , loggerMid , newPassword )


router.post( "/" , validarJWT , loggerMid , postPasswdCotroller )





module.exports = router