const Product = require('../models/productModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')


const createProduct = asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await  Product.create(req.body)
        res.json({
            newProduct
        })
    }catch(error){
        throw new Error(error)
    }
})

const getaProduct = asyncHandler(async(req,res)=>{
    try{
        const getProduct = await Product.findById(req.params._id);
        res.json({
            getProduct
        })
    }catch(error){
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async(req,res)=>{
    try{

        // Filtering

    const queryObj = {...req.query}
    const excludeFields = ['page','sort','limit','fields'];
     excludeFields.forEach(el=> delete queryObj[el])
    // console.log(queryObj,req.query);
// console.log(`i want to look for ${excludeFields}`)
console.log(queryObj);

let queryString = JSON.stringify(queryObj)
console.log(`looking for ${queryString}`)
queryString =queryString.replace(/\b(gte|gt|lte|lt)\b/g,(match) => `$${match}`)
console.log(JSON.parse(queryString))
let query =   Product.find(JSON.parse(queryString))
        
 // $or:[  {brand:req.query.brand} ,{category:req.query.category}
            // ]


    // Sorting
    
    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ")
        console.log(sortBy)
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }


    // Liming the fields

    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
        console.log(fields)
    }else{
        query = query.select('-__v')
    }


    // pagination

    const page = req.query.page
    const limit = req.query.limit;
    const skip = (page - 1 ) * limit
    query = query.skip(skip).limit(limit)
    if(req.query.page){
        const productCount = await Product.countDocuments()
        if(skip>=productCount){
            throw new Error("This page does not exist")
        }
    }
    console.log(page,limit,skip)
   
        const getProduct = await query
        res.json({
            getProduct
        })
    }catch(error){
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const update = await Product.findOneAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.json(update)
    }catch(error){
        throw new Error(error)
    }
})


const deleteProduct = asyncHandler(async(req,res)=>{
    try{
        const deleteproduct = await Product.findByIdAndDelete(req.params.id)
        res.json(deleteproduct)
    }catch(error){
        throw new Error(error)
    }
})

const addWishList = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {prodId} = req.body;
    try{
        const user =await User.findById(_id);
        const alreadyAdded =await user.wishlist.find((id)=>id.toString() === prodId)
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id,{
                $pull:{wishlist:prodId}
            },{new:true})

            res.json(user)
        }else{
            let user = await User.findByIdAndUpdate(_id,{
                $push:{wishlist:prodId}
            },{new:true})

            res.json(user)
        }
    }catch(error){
        throw new Error(error)
    }
})


const rating  = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {star,prodId,comment} = req.body;
    
    try{
        const product = await Product.findById(prodId)
        let alreadyRated = product.ratings.find((userId)=>userId.postedBy.toString() === _id.toString())
        if(alreadyRated){
        
const updateRating = await Product.updateOne(
  {  ratings:{
        $elemMatch:alreadyRated,}
},
{ $set:{"ratings.$.star":star,"ratings.$.comment":comment}},{new:true}
)
// res.json(updateRating)


        }else{
    const rateProduct = await Product.findByIdAndUpdate(prodId,{
        $push:{
            ratings:{star:star,
                comment:comment,
            postedBy:_id}
        }
    },{new:true}) 
    // res.json(rateProduct)           
        }

const getAllratings  = await Product.findById(prodId)
let totalRating = getAllratings.ratings.length;
let ratingssum = getAllratings.ratings.map((item)=>item.star).reduce((prev,curr)=>prev+curr,0)
let actualRating = Math.round(ratingssum/totalRating)
let finalProduct = await Product.findByIdAndUpdate(prodId,{
    totalrating:actualRating,
},{new:true}
)
res.json(finalProduct)
    }catch(error){
        throw new Error(error)
    }
})

module.exports = {
    createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct,addWishList,rating
}