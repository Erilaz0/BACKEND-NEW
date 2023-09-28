const Router = require("express").Router
const router = Router()
const chatModel = require("../models/chat.modelo")


router.get("/", async ( req , res ) => {

const mensajes = await chatModel.find().lean()
res.status(200).render("chat")})


module.exports = router