const Post = require("../models/Post.js")
const User = require("../models/User.js")
const {uploadImage,deleteImage} = require("../utils/cloudinary")
const fs =require("fs-extra")



exports.createPost = async (req,res)=>{
    const {title,body,userId}=req.body
    console.log(userId)
    const path = req.file?.path
    let image;
    if(path){
      const cloudinary = await uploadImage(path,"post")
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
    const post = await Post.findById(req.params.id)
    return res.json(post)

};

exports.getPostUpdate = async (req,res) => {
  const {title,userId,body } = req.body
  const id = req.params.id
  const path = req.file?.path
  try {
    const post = await Post.findById(id)
    const dataImage = post.image.imageId
    if (post.userId !== userId) {
      return res.status(403).json({ message: "acces impossible" })
    }
    if (path){
     const result = await deleteImage(dataImage)
     console.log(result)
      
    }
   
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  try {
    let image;
    if (path) {
      const cloudinary = await uploadImage(path, "post")
      image = {
        imageId: cloudinary.public_id,
        imageUrl: cloudinary.secure_url
      }
      fs.unlinkSync(path)
    }
    const post = await Post.findByIdAndUpdate(id, {
      $set: {
        title,
        image,
        body
      }
    }, {
      new: true,
    })
    res.status(200).json(post)

  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }

}






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

  exports.getTimeline = async (req, res) => {
    const { userId } = req.body;
    try {
      const currentUser = await User.findById(userId);
      const userPost = await Post.find({ userId: currentUser._id });
      const friendsPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPost.concat(...friendsPosts));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };