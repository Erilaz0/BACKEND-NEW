const Router = require("express").Router
const router = Router()
const mockingController = require("../controllers/mockingController")



router.get("/",mockingController)

module.exports = router