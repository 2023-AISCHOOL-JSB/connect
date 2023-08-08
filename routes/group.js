const express = require("express");
const router = express.Router();

const conn = require("../config/database");


router.post('/canvan', (req, res) => {
    let { todo, deadline, member } = req.body
    console.log(req.body)
    let sql = "INSERT INTO tb_canvan (user_id, todo, deadline,member,in_process, party_idx) VALUES('123123',?, ?, ?,'todo', 67131)"
    
  conn.query(sql, [todo, deadline, member], (err, rows) => {
    
      res.redirect('/group')
      
  })
})



router.get('/', (req, res) => {
    console.log(req)
    let sql = "SELECT todo, member, DATE_FORMAT(deadline, '%m / %d') AS formattedDeadline, in_process FROM tb_canvan;"
    conn.query(sql, (err, rows) => {
        res.render('screen/group', { to : rows })
    })
})

module.exports = router;