const Router = require("express").Router
const router = Router()


const { validarJWT , validarAdminJWT } = require("../utils.js")

const loggerMid = require("../functions/winstone.js")
const productsController = require("../controllers/productsControllers/productsController.js")
const productByIdController = require("../controllers/productsControllers/productByIdController.js")
const postProducts = require("../controllers/productsControllers/postProductsController.js")
const putProducts = require("../controllers/productsControllers/putProductsController.js")
const deleteProduct = require("../controllers/productsControllers/deleteProductsController.js")



router.get("/" , validarJWT , loggerMid , productsController )

router.get("/:pid" , validarAdminJWT , loggerMid , productByIdController )

router.post("/" , validarJWT, loggerMid , postProducts )

router.put("/:pid" , validarJWT , loggerMid , putProducts )

router.delete("/:pid" , validarJWT , loggerMid , deleteProduct )







module.exports = router


