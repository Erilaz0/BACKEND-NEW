const { Command , option } = require("commander")
const fs = require("fs")
const path = require("path")
const { json } = require("body-parser")

const pathDAO = path.join(__dirname,"../","archivosJson","persistance.json")
const pathJsonUsers = path.join(__dirname,"../","archivosJson","users.json")
const pathEnviroment = path.join(__dirname , "../","archivosJson","enviroment.json")



async function getJsonUsers(){ return JSON.parse( fs.readFileSync( pathJsonUsers ) ) }


function getDAO(){ return JSON.parse( fs.readFileSync( pathDAO ) ) }

function getJsonEnviroment(){ return JSON.parse( fs.readFileSync( pathEnviroment ) ) }

                  


async function serverConfig(){

    let program = new Command()

program
   .option("-D , --DAO <DAO> " , "PERSISTENCIA DE LA APP", "MONGO")
   .option("-E --ENVIROMENT <ENVIROMENT>","ENTORNO DEL SERVIDOR (PRODUCTION or DEVELOPMENT)")
   .parse(process.argv)


const opciones = program.opts()
const daoObject = { DAO :  opciones.DAO }
enviroment =  opciones.ENVIROMENT 
if(enviroment){
    fs.writeFileSync(pathEnviroment,JSON.stringify(enviroment))

}else{
    enviroment = false}
if(daoObject){

    fs.writeFileSync(pathDAO , JSON.stringify(daoObject))
}else{

    let i = 0
}

}



module.exports = { getJsonEnviroment , getDAO , getJsonUsers , serverConfig}

