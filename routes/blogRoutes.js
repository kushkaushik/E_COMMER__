const express =require('express');
const { createBlog,updateBlog,getBlog,singleBlog,likeBlog, dislikeBlog} = require('../controller/blogCtrl');
const {auth} = require('../middlewares/authMiddle')
const router = express.Router();


router.post('/createblog',createBlog)
router.get('/allblog',getBlog)
router.put('/updateblog/:_id',updateBlog)
router.get('/one/:_id',auth,singleBlog)
router.put('/likes',auth,likeBlog)
router.put('/dislikes',auth,dislikeBlog)


module.exports = router;