const User = require("../models/User.js")

const getUser = async function(req,res){
    const user = await User.find({})
    res.json(user)
    if(!user){
        res.status(400).json({message:"pas d'utilisateur"})
    } 
}

const getUserId = async function(req,res){
    const id = req.params.id

    const user = await User.findById(id)
    res.json(user)
    if(!user){
        res.status(400).json({message:"pas d'utilisateur"})
    } 
}
const getUserDelete = async function(req,res){
    const id = req.params.id

    const user = await User.findByIdAndDelete(id)
    res.json({message:"user suprimé"})
    if(!user){
        res.status(400).json({message:"pas d'user"})
    } 
}

const getUserUpdate = async function(req,res){
    const id = req.params.id

   const user = await User.findByIdAndUpdate(id,{$set:{
        pseudo:req.body.pseudo
    }},{new:true})
    res.json({message:"user update",user:user})
    if(!user){
        res.status(400).json({message:"pas d'user"})
        
    }  
}
















module.exports = {
    getUser,
    getUserId,
    getUserDelete,
    getUserUpdate
}

