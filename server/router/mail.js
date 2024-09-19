const express=require("express")
const app=express()
const route=express.Router()
const controll=require("../controller/mailLogin")

route.post('/api/login', controll.login)
route.post('/api/send-email', controll.postMail)

module.exports=route