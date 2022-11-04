const Post = require("../models/Post.js")
const User = require("../models/User.js")
const {uploadImage} = require("../utils/cloudinary")
const fs =require("fs-extra")



exports.createPost = async (req,res)=>{
    const {title,body,userId}=req.body
    const path = req.file?.path
    let image;
    if(path){
      const cloudinary = await uploadImage(path)
      image={
        imageId:cloudinary.public_id,
        imageUrl:cloudinary.secure_url
      }
    fs.unlinkSync(path)

    }
    const post = await new Post({
        title,
        body,
        userId,
        image
    })

    const savepost = await post.save()
    
    return res.json(savepost)

}

exports.getPost = async (req,res) => {

    const post = await Post.find({})
    return res.json(post)

};
exports.getPostId = async (req,res) => {
    console.log(req)
    const post = await Post.findById(req.params.id)
    return res.json(post)

};

exports.getPostUpdate = async (req,res) => {
    const post = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            body:req.body.body
        }

    },{
        new:true
    })
    return res.json({
        message:"post update",
        post:post
    })

};





exports.deletePost = async (req,res) => {
    console.log(req)
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.json({
        message:"post supprimé",
        post:post._id
    })

};


exports.addLikes  = async (req,res) => {
    const userId = req.body.userId
    const postId = req.params.id
    console.log(userId,postId)
    const post = await Post.findById(postId)
    console.log(post.likes.length)
    if (!post.likes.includes(userId)){
        await post.updateOne({
            $push:{likes:userId}
        })
        res.status(200).json({message:"post liké"})
    }
    else{
        await post.updateOne({
            $pull:{likes:userId}
        })
        res.status(200).json({message:"post disliké"})
    }
}

exports.disLikes = async (req,res) => {
    const userId = req.body.userId
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post.dislikes.includes(userId)){
        await post.updateOne({
            $push:{dislikes:userId}
        })
        res.status(200).json({message:"post disliké"})
    }
    else{
        await post.updateOne({
            $pull:{dislikes:userId}
        })
        res.status(200).json({message:"post unliké"})
    }
}

exports.commentPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) return res.json({ message: "post introuvable" })
  
      await post.updateOne({
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            contenu: req.body.contenu,
            pseudo: req.body.pseudo
          }
        }
      }, { new: true })
  
      res.json({ message: "commentaire créer" })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
  exports.deleteCommentPost = async (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    try {
      const post = await Post.findById(id);
      
      if (!post) return res.json({ message: "post introuvable" });
  
      await post.updateOne(
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ message: "commentaire supprimé" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

