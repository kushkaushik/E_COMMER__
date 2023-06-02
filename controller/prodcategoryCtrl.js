const category = require('../models/prodcategoryModel')
const asyncHandler = require('express-async-handler')


// under auth admin
const createCategory = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await category.create(req.body)
        res.json({
            newCategory
        })
    }catch(error){
        throw new Error(error)
    }
})


// same edit , delete , update

module.exports = {createCategory}