const express = require('express')
const router = express.Router();
const {blogcreateCategory} = require('../controller/blogcatCtrl')

router.post('/blogcreatecategory',blogcreateCategory)
module.exports = router;