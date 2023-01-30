const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true,
        enums:["student","instructor"]
    },
    announcements:[{type:mongoose.Schema.Types.ObjectId,ref:'aannouncement'}],
    quizzes:[{type:mongoose.Schema.Types.ObjectId,ref:'quize'}]
})
userSchema.pre("save",async function(next){
this.password=await bcrypt.hash(this.password,Number(process.env.saltRound))
next()
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel