const express = require("express")
const router =  express.Router()
const {getUser,getUserId,getUserDelete,getUserUpdate} = require("../controllers/user.controllers")
router.get("/users",getUser)
router.get("/users/:id",getUserId)
router.delete("/users/:id",getUserDelete)
router.patch("/users/:id",getUserUpdate)





module.exports = router