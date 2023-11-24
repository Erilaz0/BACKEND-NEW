const config = require("./config")
const { getJsonUsers } = require("../functions/serverConfig")

let dao ;

switch(config.DAO){

 case("MONGO"):
   
   
   dao = usersModelo = require("../dao/models/users.modelo")
   
   break;

 case("FS"):

   dao = getJsonUsers()
  break;

}

module.exports = dao