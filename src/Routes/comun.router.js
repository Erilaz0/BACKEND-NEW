const Router = require("express").Router
const router = Router()
const comunController = require("../controllers/comuncontroller")

router.get("/comun",comunController)

module.exports = router