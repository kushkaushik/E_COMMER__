const express = require('express')
const router = express.Router();
const {createUser,
    loginUserCtrl,
    getallUser,
    getOne,
    getOnedelete,
    updateaUser,blockUser,updatePassword
} = require('../controller/userCtrl');
const {auth,isAdmin} = require('../middlewares/authMiddle');

router.post('/register',createUser)
router.post('/login',loginUserCtrl)
router.get('/all',getallUser)
router.get('/one/:id',auth,isAdmin,getOne)
router.delete('/onedelete/:id',getOnedelete)
router.put('/update/:id',auth,updateaUser)
router.put('/block-user/:id',auth,isAdmin,blockUser)
router.put('/changepass',auth,updatePassword)


module.exports = router;