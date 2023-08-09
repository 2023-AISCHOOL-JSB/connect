const express = require("express");
const router = express.Router();

const conn = require("../config/database");


router.get('/', (req, res) => {
    res.render('screen/chat')
})


router.get('/chatroom', (req, res) => {
    res.render('screen/chatroom')
})

module.exports = router;