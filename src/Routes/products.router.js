const Router = require("express").Router
const router = Router()
const { error } = require("console")

const session = require("express-session")
const passport = require("passport")

const { validarJWT } = require("../utils.js")

const productsController = require("../controllers/productsControllers/productsController.js")
const productByIdController = require("../controllers/productsControllers/productByIdController.js")
const postProducts = require("../controllers/productsControllers/postProductsController.js")
const putProducts = require("../controllers/productsControllers/putProductsController.js")
const deleteProduct = require("../controllers/productsControllers/deleteProductsController.js")

/*
 

const products = path.join(__dirname,"..","archivosJson","products.json")

function saveProducts(pr){

     fs.writeFileSync(products,JSON.stringify(pr))

}


function getProducts(path){

    return JSON.parse(fs.readFileSync(path))




}
*/





router.get("/", validarJWT , productsController )

router.get("/:pid", productByIdController )

router.post("/", postProducts )

router.put("/:pid", putProducts )

router.delete("/:pid", deleteProduct )







module.exports = router


