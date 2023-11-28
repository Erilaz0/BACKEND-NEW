const Router = require("express").Router
const router = Router()
const loggerMid = require("../functions/winstone")
const loggerTest = require("../controllers/loggerController")



router.get( "/", loggerMid , loggerTest )


module.exports = router