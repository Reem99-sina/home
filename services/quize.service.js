const quizeModel = require("../DB/models/quize.model")
const userModel = require("../DB/models/user.model")

module.exports.addQuize=async(req,res)=>{
    const {id}=req.user
    const{namequize,course,topic,dueto}=req.body
    const newquize=new quizeModel({namequize,course,topic,dueto,createdBy:id})
    const savequize=await newquize.save()
    const students=await userModel.find({role:"student"})
    if(students.length>0){
        students.map(async(student)=>{
            await userModel.findByIdAndUpdate(student.id,{$push:{quizzes:savequize.id}})
        })
        res.status(200).json({message:"done add quizes to student"})
    }else{
        res.status(404).json({error:"there no student"})
    }   
}
module.exports.updatenameQuize=async(req,res)=>{
    const {id}=req.user
    const {_id}=req.params
    const{namequize,course,topic,dueto}=req.body
    const user=await userModel.findById(id)
    const savequize=await quizeModel.findByIdAndUpdate(_id,{namequize,course,topic,dueto,createdBy:user.id})
   
    res.status(200).json({message:"done update to quize"})
    
}
module.exports.deleteQuize=async(req,res)=>{
    const {_id}=req.params
    const savequize=await quizeModel.findByIdAndDelete(_id)
   
    res.status(200).json({message:"done delete to quize"})
    
}
module.exports.getquizes=async(req,res)=>{
const quizes=await quizeModel.find({})
res.status(200).json({message:"done get to quize",quizes})
}