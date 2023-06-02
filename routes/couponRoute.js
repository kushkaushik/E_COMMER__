const express = require('express')
const router = express.Router();
const {createCoupon,getAll} = require('../controller/couponCtrl')

router.post('/create',createCoupon) // auth admin
router.get('/getall',getAll) // auth admin
 // update coupon
 // delete coupon


module.exports = router