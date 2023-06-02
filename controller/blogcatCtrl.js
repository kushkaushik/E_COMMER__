const category1 = require('../models/blogCatModel')
const asyncHandler = require('express-async-handler')


// under auth admin
const blogcreateCategory = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await category1.create(req.body)
        res.json({
            newCategory
        })
    }catch(error){
        throw new Error(error)
    }
})


// same edit , delete , update

module.exports = {blogcreateCategory}