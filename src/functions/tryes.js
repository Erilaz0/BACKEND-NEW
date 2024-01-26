const moment = require("moment")

const a = async ()=>{

const a = moment()
const date1String = "2024-01-15"
const date2String = "2024-01-17"

const date1 = moment(date1String, "YYYY-MM-DD");


const date2 = moment(date2String, "YYYY-MM-DD");




const differenceInDays = date2.diff(date1, "days");


}

module.exports = a