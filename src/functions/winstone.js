const winston = require("winston")
const config = require("../config/config")

let level;
let i = process.env.ENVIROMENT || config.ENVIROMENT

if(i === "production"){

    level = "info"

}else if(i === "development"){

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