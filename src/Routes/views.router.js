const Router = require("express").Router
const router = Router()
const handleBars = require("express-handlebars")
const { inicializePassportJWT } = require("../config/jwt.config")
const passport = require("passport")

const deleteCookiesSession = require("../controllers/viewsController/logoutController")
const loginRedirection = require("../controllers/viewsController/loginRedirectionController")
const profile = require("../controllers/viewsController/profileController")
const registerView = require("../controllers/viewsController/registerViewsController")
const loginView = require("../controllers/viewsController/loginViewController")
const realtimeproductsView = require("../controllers/viewsController/realtimeproductsViewController")
const current = require("../controllers/viewsController/currentController")





router.get("/current", passport.authenticate( "current" , { session : false } ) , current )

router.get("/realtimeproducts", realtimeproductsView )

router.get("/api/sessions/login", loginView )

router.get("/register", registerView )
 
router.get("/profile", profile )

router.get("/logout", deleteCookiesSession );
  
router.get("/", loginRedirection )




















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

