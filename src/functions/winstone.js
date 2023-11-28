const winston = require("winston")
const config = require("../config/config")

let level;
console.log("corriendo servidor en modo entorno de: " + config.ENVIROMENT)
if(config.ENVIROMENT === "production"){

    level = "info"

}else if(config.ENVIROMENT === "development"){

    level = "debug"
}else{level = "info"}

const logger = winston.createLogger({

  level : level,
  transports:[

    new winston.transports.Console({

    level:level,
    format:winston.format.simple()
   

    }),new winston.transports.File({
       
        filename : `./errors.log`,
        level: "warn"


    })
  ]


})


const loggerMid = (req , res , next)=>{

    req.logger = logger
    next()

}

module.exports = loggerMid