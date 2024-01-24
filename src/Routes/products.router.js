const Router = require("express").Router
const router = Router()


const { validarJWT , validarAdminJWT } = require("../utils.js")

const loggerMid = require("../functions/winstone.js")
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

/*it("testing PUT endpoint" , async function(){
     
    const bodyRequest = { "title" : "test" }

    const products = await productsService.createProduct(product)
    const body = requester.put(`/api/products/${products._id}`)
                          .set("cookie", `token=${token}`)
                          .send(bodyRequest)

    


   })

*/

router.get("/" , validarJWT , loggerMid , productsController )

router.get("/:pid" , validarAdminJWT , loggerMid , productByIdController )

router.post("/" , validarJWT, loggerMid , postProducts )

router.put("/:pid" , validarJWT , loggerMid , putProducts )

router.delete("/:pid" , validarJWT , loggerMid , deleteProduct )







module.exports = router


