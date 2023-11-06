const Router = require("express").Router
const router = Router()
const chat = require("../controllers/chatController/chatController")


router.get("/" , chat )




module.exports = router