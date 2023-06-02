const express = require('express')
const router = express.Router();
const {createCategory} = require('../controller/prodcategoryCtrl')

router.post('/createcategory',createCategory)
module.exports = router;