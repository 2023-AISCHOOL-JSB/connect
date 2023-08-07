const express = require('express')
const router = express.Router()

const conn = require("../config/database");

router.get('/', (req, res) => {
    let sql = "select * from tb_board WHERE b_permit = 'YES' order by b_idx desc LIMIT 12"
    conn.query(sql,(err,rows)=>{
        res.render("screen/main",{data:rows, obj : req.session.user});
    })});


router.get('/join', (req, res) => {
    res.render('screen/join')
})

router.get('/write', (req, res) => {
    res.render('screen/write')
})

router.get('/detail', (req, res) => {
    // req.query에서 post_idx 값 가져오기
    const post_idx = req.query.a;
    
    // 쿼리 문자열에 post_idx가 없을 경우 오류 메시지 출력
    if (!post_idx) {
        return res.status(400).send('Invalid request: post_idx is required.');
    }

    // post_idx에 해당하는 게시글 찾기
    let sql = "SELECT * FROM tb_board WHERE b_permit = 'YES' AND b_idx = ?";
    conn.query(sql, [post_idx], (err, rows) => {
        if (err) {
            // 오류 처리
            console.error(err);
            return res.status(500).send('Database error');
        }

        if (rows.length === 0) {
            // 해당 게시글이 없을 경우 오류 메시지 출력
            return res.status(404).send('Post not found');
        }

        // 게시글 데이터를 detail 템플릿으로 전달
        res.render("screen/detail", { data: rows });
    });
});



// 나중에 group router 만들어야됨
router.get('/group', (req, res) => {
    res.render('screen/group')
})

module.exports = router;
