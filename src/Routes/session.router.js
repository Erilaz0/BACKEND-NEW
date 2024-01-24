const Router = require("express").Router
const router = Router()
const passport = require("passport");
const login = require("../controllers/sessionsControllers/loginPostController")
const register = require("../controllers/sessionsControllers/registerPostController")
const errGithub = require("../controllers/sessionsControllers/errorGithubController")
const githubLogin = require("../controllers/sessionsControllers/githubController")
const loggerMid = require("../functions/winstone")




router.get("/github", loggerMid , passport.authenticate("github",{failureRedirect:"/errorGithub"}),(req,res)=>{})

router.get("/callbackGithub", loggerMid , passport.authenticate("github",{failureRedirect:"/errorGithub"}), githubLogin )

router.get("/errorGithub", loggerMid , errGithub )

router.post("/register", loggerMid , register )

router.post("/login", loggerMid , login )



module.exports = router