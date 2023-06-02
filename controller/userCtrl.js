const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('../config/jwtToken')


const createUser = asyncHandler(async(req,res)=>{
    try{
    const email = req.body.email;
    const findUser = await User.findOne({email})
    if(!findUser){
        const newUser = await User.create(req.body)
        res.json(newUser)
    }else{
       throw new Error("user Already exist")
    }
    }
    catch(err){
        console.log(err);
    }
}
)


const loginUserCtrl = asyncHandler(async(req,res)=>{
   
        const {email,password} = req.body;
        // check if user exist of not
        const findUser = await User.findOne({email})
        if(findUser && await findUser.isPasswordMatched(password)){
            res.json({
                _id:findUser?._id,
                firstname:findUser?.firstname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                token:jwt.generateToken(findUser?._id,)
            })
        }else{
            throw new Error("invalid Credential's")
        }
   
})


const getallUser = asyncHandler(async(req,res)=>{
    try{
    const getUsers = await User.find().populate("wishlist","-_id title price")
        res.json(getUsers)
    }catch(error){
        throw new Error(error)
    }
})

const getOne = asyncHandler(async(req,res)=>{
    console.log(req.user);
    console.log("hii")
    try{
        const getOneUser = req.params.id
        User.findById(getOneUser).then(data=>{
            res.json(data)
        })
     
    }catch(err){
        throw new Error(err)
    }
})


const getOnedelete = asyncHandler(async(req,res)=>{
    try{
        const deletetOneUser = req.params.id
        User.findByIdAndDelete(deletetOneUser).then(data=>{
            res.json(data)
        })
     
    }catch(err){
        throw new Error(err)
    }
})


//update a user
const updateaUser = asyncHandler(async(req,res)=>{
    const id = req.params.id
    console.log(req.user)
    try{
        const updateUser = await User.findByIdAndUpdate(id,req.body).then(data=>{
            res.json(data)
        })

    }catch(error){
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const block = await User.findByIdAndUpdate(id,{
            isBlocked:true,
        },
        {
            new:true
        }
        
        );
        res.json({
            message:"user Blocked"
        })
    }catch(error){
        throw new Error(error)
    }
})


const updatePassword = asyncHandler(async(req,res)=>{
   console.log("hii")
  const {_id} = req.user;
  const {password} = req.body;
  const user = await User.findById(_id)
  if(password){
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword)
  }else{
    res.json(user)
  }
})


module.exports = {createUser,loginUserCtrl,getallUser,getOne,getOnedelete,updateaUser,blockUser
,updatePassword

}