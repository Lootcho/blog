const express = require("express")
const router =  express.Router()
const {signUp,signIn} =require("../controllers/auth.controllers")
const {upload} = require("../middleware/upload")

const { validation } = require("../middleware/validation.js")
const { userSchema } = require("../utils/userValidation.js")

router.post("/register",validation(userSchema),upload,signUp)
router.post("/login",signIn)



module.exports=router