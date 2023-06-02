const express = require('express');
const { createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct,addWishList,rating } = require('../controller/productCtrl');
const router = express.Router();
const {auth,isAdmin} = require('../middlewares/authMiddle')

router.post('/createProduct',createProduct)
router.get('/getaProduct/:_id',getaProduct)
router.get('/getAllProduct',getAllProduct)
router.put('/updateOne/:id',auth,isAdmin,updateProduct)
router.delete('/deleteOne/:id',deleteProduct)
router.put('/wishlist',auth,addWishList)
router.put('/rating',auth,rating)



module.exports = router;
