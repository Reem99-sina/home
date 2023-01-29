const mongoose=require("mongoose")
module.exports.connectdb=()=>{
    return mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("done")
}).catch((error)=>{
    console.log("error connect db")
})}