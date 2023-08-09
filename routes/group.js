const express = require("express");
const router = express.Router();

const conn = require("../config/database");


router.post('/canvan', (req, res) => {
  let { todo, deadline, member } = req.body;
  console.log(req.body);
  let user_id = req.session.user.user_id
  let sql = "INSERT INTO tb_canvan (user_id, todo,in_process,party_idx,deadline, member) VALUES(?, ?,'0', '67132', ?,?)";
  conn.query(sql, [user_id, todo, deadline, member], (err, rows) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ message: 'Database error' });
      } else {
          res.redirect('/group');
      }
  });
});

router.post('/update/:id', (req, res) => {
  const process_idx = parseInt(req.params.id);
  const { in_process } = req.body;

  const sql = 'UPDATE tb_canvan SET in_process = ? WHERE process_idx = ?';
  conn.query(sql, [in_process, process_idx], (error, result) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Database error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item updated successfully' });
    }
  });
});

router.get('/', (req, res) => {
    console.log(req)
    let sql = "SELECT todo, member, DATE_FORMAT(deadline, '%m / %d') AS formattedDeadline, in_process, process_idx FROM tb_canvan;"
    conn.query(sql, (err, rows) => {
      console.log(rows)
        res.render('screen/group', { to : rows , obj: req.session.user })
    })
})


router.delete('/delete/:id', function(req, res) {
  const id = parseInt(req.params.id);
  
  // MySQL 데이터베이스에서 해당 ID의 항목 삭제
  const deleteQuery = 'DELETE FROM tb_canvan WHERE process_idx = ?'; //process_idx -> task_id로 수정

  conn.query(deleteQuery, [id], (error, result) => {
      if (error) {
          console.error('Database error:', error);
          res.status(500).json({message: 'Database error'});
      } else if (result.affectedRows === 0) {
          res.status(404).json({message: 'Item not found'});
      } else {
          res.json({message: 'Item deleted successfully'});
      }
  });
});

module.exports = router;