const Router = require("express").Router
const router = Router()
const passport = require("passport")
const session = require("express-session")
const bcrypt = require('bcrypt');
const { generaJWT } = require("../utils")
const { validarJWT } = require("../utils")
const jwt = require("jsonwebtoken")
const { json } = require("body-parser")
const login = require("../controllers/sessionsControllers/loginPostController")
const register = require("../controllers/sessionsControllers/registerPostController")
const errGithub = require("../controllers/sessionsControllers/errorGithubController")
const githubLogin = require("../controllers/sessionsControllers/githubController")




router.get("/github",passport.authenticate("github",{failureRedirect:"/errorGithub"}),(req,res)=>{})

router.get("/callbackGithub",passport.authenticate("github",{failureRedirect:"/errorGithub"}), githubLogin )

router.get("/errorGithub", errGithub )

router.post("/register", register )

router.post("/login", login )



module.exports = router