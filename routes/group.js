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
    let sql = "SELECT todo, member, DATE_FORMAT(deadline, '%m / %d') AS formattedDeadline, in_process, process_idx FROM tb_canvan;"
    conn.query(sql, (err, rows) => {
        res.render('screen/group', { to : rows })
    })
})


router.delete('/delete/:id', function(req, res) {
    const id = parseInt(req.params.id);
    

  // MySQL 데이터베이스에서 해당 ID의 항목 삭제
  const deleteQuery = 'DELETE FROM tb_canvan WHERE process_idx = ?';

  conn.query(deleteQuery, [id], (error, result) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Database error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  });
});

// drop 하면 post로 바뀜

router.post('/update/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const process = req.body.process
    

  // MySQL 데이터베이스에서 해당 ID의 항목 삭제
  const updateQuery = "update tb_canvan set in_process = ? where process_idx = ?";

  conn.query(updateQuery, [id, process], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'Database error' });
    } else if (rows.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  });
});


module.exports = router;