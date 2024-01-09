const Router = require("express").Router
const router = Router()
const consoleImage = require("../functions/multer")



router.get("/",(req , res)=>{
 
    res.status(200).render(`image`)


})


router.post("/", consoleImage , (req,res)=>{

console.log("yayy")


})



module.exports = router