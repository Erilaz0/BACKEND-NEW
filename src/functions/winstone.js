const winston = require("winston")
const config = require("../config/config")
const a = require("../Error/errors.log")
let level;


if(config.ENVIROMENT === "production"){

    level = "info"

}else{

    level = "debug"
}

const logger = winston.createLogger({

  level : level,
  transports:[

    new winston.transports.Console({

    level:level,
    format:winston.format.simple()

    }),new winston.transports.File({
        //onedrive no nos permite usar error.log asi q modificamos el nombre
        filename : "../Error/errors.log",
        level: "error"


    })
  ]


})


const loggerMid = (req , res , next)=>{

    req.logger = logger
    next()

}

module.exports = loggerMid