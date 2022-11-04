const express = require("express")
const { getPost,getPostId,deletePost,createPost,getPostUpdate,addLikes,disLikes,commentPost,deleteCommentPost } = require("../controllers/post.controllers")
const router =  express.Router()
const authenticated = require("../middleware/authenticated")
const {upload} = require("../middleware/upload")

router.post("/posts",authenticated,upload,createPost)
router.get("/posts",authenticated,getPost)
router.get("/posts/:id",authenticated,getPostId)
router.patch("/posts/:id",authenticated,getPostUpdate)
router.delete("/posts/:id",authenticated,deletePost)
router.put("/posts/:id/likes",authenticated,addLikes)
router.put("/posts/:id/dislike",authenticated,disLikes)
router.put("/posts/:id/comment-post", authenticated,commentPost)
router.put("/posts/:id/comment-delete-post", authenticated, deleteCommentPost)


module.exports=router