const express = require("express")
const router =  express.Router()
const {getUser,getUserId,getUserDelete,getUserUpdate, userFollow, userUnFollow} = require("../controllers/user.controllers")
router.get("/users",getUser)
router.get("/users/:id",getUserId)
router.delete("/users/:id",getUserDelete)
router.patch("/users/:id",getUserUpdate)
router.put("/users/:id/follow",userFollow)
router.put("/users/:id/Unfollow",userUnFollow)





module.exports = router