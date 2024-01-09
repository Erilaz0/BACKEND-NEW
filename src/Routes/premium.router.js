const Router = require("express").Router
const router = Router()
const premiumController = require("../controllers/premiumController")
const documents = require("../controllers/multerController")
const changeToPremiumController = require("../controllers/changeToPremiumController")


router.get("/premium/:uid" , premiumController )

router.get("/premium" , changeToPremiumController )

router.post("/:uid/documents" , documents )

module.exports = router