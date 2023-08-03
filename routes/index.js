const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    console.log('mainPage',req.session.user)
    res.render('main', {obj : req.session.user})
})

// 회원가입 Page 열기
router.get('/join',(req,res)=>{
    res.render('join')
})

module.exports = router
