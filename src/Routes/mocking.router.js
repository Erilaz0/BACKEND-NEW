const Router = require("express").Router
const router = Router()
const mockingController = require("../controllers/mockingController")
const loggerMid = require("../functions/winstone.js")



router.get("/" , loggerMid , mockingController)

module.exports = router