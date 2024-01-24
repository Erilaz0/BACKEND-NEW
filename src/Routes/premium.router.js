const Router = require("express").Router
const router = Router()
const premiumController = require("../controllers/premiumController")
const documents = require("../controllers/multerController")
const changeToPremiumController = require("../controllers/changeToPremiumController")
const accounts = require("../controllers/accountsController")
const userById = require("../controllers/userByIdController")
const changeRolUserController = require("../controllers/changeRolUserController")
const { validarAdminJWT } = require("../utils")
const loggerMid = require("../functions/winstone")
const clear = require("../controllers/deleteExpiredUsersController")

router.get( "/premium/:uid" , loggerMid , premiumController )

router.post( "/premium/admin/change", validarAdminJWT , loggerMid , changeRolUserController )

router.get( "/premium" , loggerMid , changeToPremiumController )

router.post( "/:uid/documents" , loggerMid , documents )

router.get( "/accounts" , validarAdminJWT , loggerMid , accounts )

router.get( "/:uid/user" , validarAdminJWT , loggerMid , userById )

router.delete( "/expiredusers" , loggerMid , clear )



module.exports = router