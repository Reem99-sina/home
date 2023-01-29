const mongoose=require("mongoose")
const announcementSchema=mongoose.Schema({
    paragraph:{
        type: String,
        required: true
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    date:String
},{
    timestamps: true
})
const aannouncementModel=mongoose.model("aannouncement",announcementSchema)
module.exports=aannouncementModel