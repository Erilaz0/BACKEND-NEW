const usersService = require("../services/users.service")

async function userById( req , res ){

try{
    let id = req.params.uid
    const user = await usersService.userById(id)
    
    res.setHeader("Content-Type","application/json")
    res.status(200).json(user)

}catch{

    req.logger.error("no se ah podido encontrar un usuario por su id - userByIdController.js")
}

}


module.exports = userById