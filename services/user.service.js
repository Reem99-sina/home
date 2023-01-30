const userModel = require("../DB/models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const quizeModel = require("../DB/models/quize.model")


module.exports.signup=async(req,res)=>{
const {username,password,role}=req.body
console.log(req.file)

    const newUser=new userModel({username,password,role})
    const userAdd=await newUser.save()
    const quizes=await quizeModel.find({match:{dueto:{$gte:new Date()}}})
    console.log(quizes,new Date())
    if(quizes.length>0){
        quizes.map(async(quize)=>{
            await userModel.findByIdAndUpdate(userAdd.id,{$push:{quizzes:quize.id}})
        })
    }
    res.status(200).json({message:"done add new user"})
}

module.exports.signin=async(req,res)=>{
    const {username,password}=req.body
    const User=await userModel.findOne({username}).populate({path:"announcements quizzes",populate:{
        path:"createdBy"
    }});
    if(User){
        const hasPassworduser=await bcrypt.compare(password,User.password)
        if(hasPassworduser){
            const Token=jwt.sign({ id: User._id,role:User.role, isLogged: true }, process.env.jwtcode)
            res.status(200).json({ message: "done find user take token", Token ,User})
        }else{
            res.status(404).json({ error: "not correct password" })
        }
    }else{
        res.status(404).json({ message: "not have this user" });
    }
}

module.exports.updateUser=async(req,res)=>{
    const {id}=req.user
    const {username,password,role}=req.body
    const userUpdate=await userModel.findById(id)
    if(password){
        const match=await bcrypt.compare(password,userUpdate.password)
        if(match){
            res.status(404).json({error:"the same password"})
        }else{
        const hashPassword=await bcrypt.hash(password,Number(process.env.saltRound))
        const uUpdate=await userModel.findByIdAndUpdate(id,{username,password:hashPassword,role})
        res.status(200).json({message:"done update"})
        }
    }else{
        const uUpdate=await userModel.findByIdAndUpdate(id,{username,password,role})
        res.status(200).json({message:"done update"})
    }
}
module.exports.deleteuser=async(req,res)=>{
    const {id}=req.user
    const userUpdate=await userModel.findByIdAndDelete(id)
    res.status(200).json({message:"done delete user"})
}
module.exports.alluser=async(req,res)=>{
    const userUpdate=await userModel.find()
    res.status(200).json({message:"done delete user",userUpdate})
}
module.exports.allinstructoruser=async(req,res)=>{
    const userUpdate=await userModel.find({role:"instructor"})
    res.status(200).json({message:"done delete user",userUpdate})
}
module.exports.allstudentuser=async(req,res)=>{
    const userUpdate=await userModel.find({role:"student"})
    res.status(200).json({message:"done delete user",userUpdate})
}