const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async(req,res)=>{
    try{
        const newBlog = await Blog.create(req.body)
        res.json({
            status:"success",
            newBlog
        })
    }catch(error){
        throw new Error(error)
    }
})


const updateBlog = asyncHandler(async(req,res)=>{
    const id = req.params._id
    try{
        const update = await Blog.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json({
            status:"success",
            updateBlog
        })
    }catch(error){
        throw new Error(error)
    }
})


const getBlog = asyncHandler(async(req,res)=>{
  
    try{
        const update = await Blog.find()
        res.json({
            status:"success",
            update
        })
    }catch(error){
        throw new Error(error)
    }
})


const singleBlog = asyncHandler(async(req,res)=>{
    const id = req.params._id
    try{
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        const updateViews = await Blog.findOneAndUpdate(id,
            {
                $inc:{numViews:1}
            },{new:true}
            )
        res.json({
            status:"success",
            getBlog
        })
    }catch(error){
        throw new Error(error)
    }
})



const likeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    // find the blog which you want the liked
    const blog = await Blog.findById(blogId)
// find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the post
    const isLiked =  blog?.isLiked
    // find the user if he dislikes the post
    const alreadyDisliked = blog?.dislikes?.find((userId)=>userId?.toString() === loginUserId.toString())
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{dislikes:loginUserId},
            isDisLiked:false
        },{new:true})
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{likes:loginUserId},
            isLiked:false
        },{new:true})
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push:{likes:loginUserId},
            isLiked:true
        },{new:true})
        res.json(blog)
    }

})






const dislikeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    // find the blog which you want the liked
    const blog = await Blog.findById(blogId)
// find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the post
    const isDisLiked =  blog?.isDisLiked
    // find the user if he dislikes the post
    const alreadyliked = blog?.likes?.find((userId)=>userId?.toString() === loginUserId.toString())
    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{likes:loginUserId},
            isLiked:false
        },{new:true})
    }
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $pull:{dislikes:loginUserId},
            isDisLiked:false
        },{new:true})
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,{
            $push:{dislikes:loginUserId},
            isDisLiked:true
        },{new:true})
        res.json(blog)
    }

})



module.exports = {createBlog
,updateBlog,getBlog,singleBlog,likeBlog,dislikeBlog
}