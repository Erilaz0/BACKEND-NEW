const { Command , option } = require("commander")
const fs = require("fs")
const path = require("path")
const { json } = require("body-parser")

const pathDAO = path.join(__dirname,"../","archivosJson","persistance.json")
const pathJsonUsers = path.join(__dirname,"../","archivosJson","users.json")

let enviroment;

async function getJsonUsers(){

  return JSON.parse(fs.readFileSync(pathJsonUsers))
                  


}


function getDAO(){return JSON.parse(fs.readFileSync(pathDAO))}


async function serverConfig(){

    let program = new Command()

program
   .option("-D , --DAO <DAO> " , "PERSISTENCIA DE LA APP", "MONGO")
   .option("-E --ENVIROMENT <ENVIROMENT>","ENTORNO DEL SERVIDOR (PRODUCTION or DEVELOPMENT)")
   .parse(process.argv)


const opciones = program.opts()
const daoObject = { DAO :  opciones.DAO }
enviroment = { ENVIROMENT : opciones.ENVIROMENT }

fs.writeFileSync(pathDAO , JSON.stringify(daoObject))
}



module.exports = { enviroment , getDAO , getJsonUsers , serverConfig}

