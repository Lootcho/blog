const express = require("express")
const { getPost,getPostId,deletePost,createPost,getPostUpdate } = require("../controllers/post.controllers")
const router =  express.Router()
const authenticated = require("../middleware/authenticated")

router.post("/posts",authenticated,createPost)
router.get("/posts",authenticated,getPost)
router.get("/posts/:id",authenticated,getPostId)
router.patch("/posts/:id",authenticated,getPostUpdate)
router.delete("/posts/:id",authenticated,deletePost)



module.exports=router