const Router = require("express").Router
const router = Router()

const cartDelete = require("../controllers/cartsControllers/cartDeleteController.js")
const cartProductDelete = require("../controllers/cartsControllers/cartProductDeleteController.js")
const cartUpdate = require("../controllers/cartsControllers/cartPutController.js")
const cartCreate = require("../controllers/cartsControllers/cartsPostController.js")
const cartById = require("../controllers/cartsControllers/cartsByIdController.js")
const getCarts = require("../controllers/cartsControllers/cartsController.js")

const { validarJWT } = require("../utils.js")




//const products = path.join(__dirname,"..","archivosJson","products.json")
//const carrito = path.join(__dirname,"..","archivosJson","carts.json")

/* function getProducts(pr){


     return JSON.parse(fs.readFileSync(pr,"utf-8"))


}




function getCarro(path){

   return JSON.parse(fs.readFileSync(path,"utf-8"))

}

function saveCart(cart){

    fs.writeFileSync(carrito,JSON.stringify(cart))


}

*/

router.get("/", validarJWT , getCarts )

router.get("/:pid", validarJWT , cartById )

router.post("/" , validarJWT , cartCreate )

router.put("/:cid/products/:pid", validarJWT , cartUpdate )

router.delete("/:cid/products/:pid", validarJWT , cartProductDelete )

router.delete("/:cid", validarJWT , cartDelete )



module.exports = router