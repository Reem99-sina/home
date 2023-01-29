const mongoose=require("mongoose")
const quizeScheam=mongoose.Schema({
    namequize:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    dueto:{
        type:String,
        required:true
    },createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})
const quizeModel=mongoose.model("quize",quizeScheam)
module.exports=quizeModel