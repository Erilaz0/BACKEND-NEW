const Router = require("express").Router
const router = Router()
const handleBars = require("express-handlebars")
const { inicializePassportJWT } = require("../config/jwt.config")
const passport = require("passport")
const { validarAdminJWT } = require("../utils")
const { validarJWT } = require("../utils")
const loggerMid = require("../functions/winstone")
const productImage = require("../functions/multer")



const deleteCookiesSession = require("../controllers/viewsController/logoutController")
const loginRedirection = require("../controllers/viewsController/loginRedirectionController")
const profile = require("../controllers/viewsController/profileController")
const registerView = require("../controllers/viewsController/registerViewsController")
const loginView = require("../controllers/viewsController/loginViewController")
const realtimeproductsView = require("../controllers/viewsController/realtimeproductsViewController")
const current = require("../controllers/viewsController/currentController")





router.get("/current", passport.authenticate( "current" , { session : false } ) ,  loggerMid , current )

router.get("/realtimeproducts", validarAdminJWT , loggerMid , realtimeproductsView )

router.post("/realtimeproducts", loggerMid , productImage )

router.get("/api/sessions/login" , loggerMid , loginView )

router.get("/register", loggerMid , registerView )
 
router.get("/profile", loggerMid , profile )

router.get("/logout", loggerMid , deleteCookiesSession );
  
router.get("/", loggerMid , loginRedirection )
























/*

const products = path.join(__dirname,"..","archivosJson","products.json")

function getProducts(products){

    return  JSON.parse(fs.readFileSync(products))

}


function saveProducts(prod){

      fs.writeFileSync(products,JSON.stringify(prod))


}

*/




module.exports = router

