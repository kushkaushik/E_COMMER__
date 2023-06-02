const branda = require('../models/brandModel')
const asyncHandler = require('express-async-handler')


// under auth admin
const brand = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await branda.create(req.body)
        res.json({
            newCategory
        })
    }catch(error){
        throw new Error(error)
    }
})


// same edit , delete , update

module.exports = {brand}