const Router = require("express").Router
const router = Router()
const chat = require("../controllers/chatController/chatController")
const  { validarJWT } = require("../utils.js")
const  loggerMid  = require("../functions/winstone.js")


router.get("/" , validarJWT , loggerMid , chat )




module.exports = router