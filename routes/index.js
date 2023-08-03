const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('screen/main')
})

router.get('/join', (req, res) => {
    res.render('screen/join')
})

router.get('/write', (req, res) => {
    res.render('screen/write')
})

router.get('/detail', (req, res) => {
    res.render('screen/detail')
})

module.exports = router
