const aannouncementModel = require("../DB/models/announcement.model")
const quizeModel = require("../DB/models/quize.model")
const userModel = require("../DB/models/user.model")

module.exports.addannouncement=async(req,res)=>{
    const {id}=req.user
    const{paragraph}=req.body
    const newannouncement=new aannouncementModel({date:new Date(),createdBy:id,paragraph})
    const saveAnnouncement=await newannouncement.save()
    const students=await userModel.find({role:"student"})
    if(students.length>0){
        students.map(async(student)=>{
            await userModel.findByIdAndUpdate(student.id,{$push:{announcements:saveAnnouncement.id}})
        })
        res.status(200).json({message:"done add announcement to student"})
    }else{
        res.status(404).json({error:"there no student"})
    }   
}
module.exports.updateAnnouncement=async(req,res)=>{
    const {id}=req.user
    const {_id}=req.params
    const{paragraph}=req.body
    const user=await userModel.findById(id)
    const savequize=await aannouncementModel.findByIdAndUpdate(_id,{paragraph,date:new Date(),createdBy:user.id})
   
    res.status(200).json({message:"done update to announcement"})
    
}
module.exports.deleteAnnouncement=async(req,res)=>{
    const {_id}=req.params
    const saveannouncement=await aannouncementModel.findByIdAndDelete(_id)
   
    res.status(200).json({message:"done delete to announcement"})
    
}
module.exports.getAnnouncement=async(req,res)=>{
const announcements=await aannouncementModel.find({})
res.status(200).json({message:"done get to quize",announcements})
}
module.exports.getAnnouncementByid=async(req,res)=>{
    const announcements=await userModel.findById(req.user.id).populate("announcements").select("announcements -_id")
    res.status(200).json({message:"done get to announcement",announcements})
    }