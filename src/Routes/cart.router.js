const Router = require("express").Router
const router = Router()

const cartDelete = require("../controllers/cartsControllers/cartDeleteController.js")
const cartProductDelete = require("../controllers/cartsControllers/cartProductDeleteController.js")
const cartUpdate = require("../controllers/cartsControllers/cartPutController.js")
const cartCreate = require("../controllers/cartsControllers/cartsPostController.js")
const cartById = require("../controllers/cartsControllers/cartsByIdController.js")
const getCarts = require("../controllers/cartsControllers/cartsController.js")

const loggerMid = require("../functions/winstone.js")

const { validarJWT } = require("../utils.js")




router.get("/", validarJWT , loggerMid , getCarts )

router.get("/:pid", validarJWT , loggerMid , cartById )

router.post("/" , validarJWT , loggerMid , cartCreate )

router.put("/:cid/products/:pid", validarJWT , loggerMid , cartUpdate )

router.delete("/:cid/products/:pid", validarJWT , loggerMid , cartProductDelete )

router.delete("/:cid", validarJWT , loggerMid , cartDelete )



module.exports = router