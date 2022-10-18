const express = require("express")
const router =  express.Router()
const {signUp,signIn} =require("../controllers/auth.controllers")
const {upload} = require("../middleware/upload")


router.post("/register",upload,signUp)
router.post("/login",signIn)



module.exports=router