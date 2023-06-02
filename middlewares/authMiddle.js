const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const key = "mysecret"
const auth = expressAsyncHandler(async(req,res,next)=>{
    
        let token;
        if(req?.headers?.authorization?.startsWith('Bearer ')){
            token = req?.headers?.authorization.split(' ')[1]
      
                
                if(token){
                    const decoded = jwt.verify(token,key)
                    const user = await User.findById(decoded?.id)
                    req.user = user
              
                    next();
                }
            else{
                throw new Error('not authorized token expired')
            }
        }else{
            throw new Error('There is no token attached to the header')
        }
    
})


const isAdmin = expressAsyncHandler(async(req,res,next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email})
    if(adminUser.role!== "admin"){
        throw new Error("you are not an admin")
    }else{
        next();
    }
})


module.exports = {auth,isAdmin}