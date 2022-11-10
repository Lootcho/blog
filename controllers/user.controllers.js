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

//follow

const userFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({
            $push: { followings: req.params.id },
          });
          res.status(200).json("vous suivez cette personne");
        } else {
          res.status(403).json("vous suivez déja cette personne");
        }
      } catch (error) {
        res.status(403).json(error.message);
      }
    } else {
      res.status(403).json("vous ne pouvez pas vous suivre");
    }
  };

//unfollow

const userUnFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
  
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({
            $pull: { followings: req.params.id },
          });
          res.status(200).json("vous suivez plus cette personne");
        } else {
          res.status(403).json("vous suivez déja cette personne");
        }
      } catch (error) {
        res.status(403).json(error.message);
      }
    } else {
      res.status(403).json("vous ne pouvez pas vous suivre");
    }
  };











module.exports = {
    getUser,
    getUserId,
    getUserDelete,
    getUserUpdate,
    userFollow,
    userUnFollow,
}

