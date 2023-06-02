const express = require('express')
const router = express.Router();
const {brand} = require('../controller/brandCtrl')

router.post('/createbrand',brand)
module.exports = router;