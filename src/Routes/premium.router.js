const Router = require("express").Router
const router = Router()
const premiumController = require("../controllers/premiumController")


router.get("/:uid", premiumController)

module.exports = router