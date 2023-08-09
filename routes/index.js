const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.get("/", (req, res) => {
  let sql = `
      SELECT tb_board.*, tb_user.user_name 
      FROM tb_board 
      INNER JOIN tb_user ON tb_board.user_id = tb_user.user_id 
      WHERE tb_board.b_permit = 'YES'
      ORDER BY tb_board.b_idx DESC
      LIMIT 12
    `;
  conn.query(sql, (err, rows) => {
    res.render("screen/main", { data: rows, obj: req.session.user });
  });
});

// 검색 기능
router.post('/search',(req,res)=>{
  console.log(req.body.content)
  const search = req.body.content

  let sql = `SELECT * FROM tb_board WHERE b_title LIKE '%${search}%' OR b_content LIKE '%${search}%' OR user_id LIKE '%${search}%' OR b_type LIKE '%${search}%' order by created_at desc`

  conn.query(sql,[search],(err, rows)=>{
   res.render('screen/main', { data:rows , obj: req.session.user })
  })
})

router.get("/join", (req, res) => {
  res.render("screen/join");
});

router.get("/write", (req, res) => {
  res.render("screen/write", { obj: req.session.user });
});

router.delete('/deletePost/:postIdx', (req, res) => {
  const postIdx = req.params.postIdx;

  // SQL 쿼리를 사용하여 게시물 삭제
  const sql = 'UPDATE tb_board SET b_permit = "NO" WHERE b_idx = ?';
  conn.query(sql, [postIdx], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('데이터베이스 에러');
    }

    if (result.affectedRows > 0) {
      res.status(200).send('성공적으로 삭제되었습니다.');
    } else {
      res.status(404).send('해당 게시물이 없습니다.');
    }
  });
});

router.get("/detail", (req, res) => {
  // req.query에서 post_idx 값 가져오기
  const post_idx = req.query.a;

  // 쿼리 문자열에_idx가 없을 경우 오류 메시지 출력
  if (!post_idx) {
    return res.status(400).send("Invalid request: post_idx is required.");
  }

  // 세션에 viewedPosts 객체가 없 경우 초기화
  if (!req.session.viewedPosts) {
    req.session.viewedPosts = {};
  }

  if (!req.session.viewedPosts[post_idx]) {
    // post_idx에 해당하는 게시글의 조회수 1 증가
    let updateViewsSql =
      "UPDATE tb_board SET b_views = b_views + 1 WHERE b_idx = ?";
    conn.query(updateViewsSql, [post_idx], (err, result) => {
      if (err) {
        // 오류 처리
        console.error(err);
        return res.status(500).send("Database error");
      }

      // 해당 글에 대한 조회수를 이미 증가시켰음을 표시
      req.session.viewedPosts[post_idx] = true;

      // 조회수 업데이트 후 게시글 가져오기
      getPostDetail(post_idx, req, res);
    });
  } else {
    // 이미 조회한 글인 경우 조회수 증가 없이 게시글 가져오기
    getPostDetail(post_idx, req, res);
  }
});

// 댓글 수를 가져오는 함수 추가
function getCommentCount(post_idx) {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(cmt_content) as commentCount FROM tb_comment WHERE b_idx = ?";
    conn.query(query, [post_idx], (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].commentCount);
      }
    });
  });
}

// 게시글 가져오는 함수를 수정하여 댓글 수를 함께 가져옴
async function getPostDetail(post_idx, req, res) {
  let selectPostSql = `
    SELECT tb_board.*, tb_user.user_name
    FROM tb_board
    INNER JOIN tb_user ON tb_board.user_id = tb_user.user_id
    WHERE tb_board.b_permit = 'YES' AND tb_board.b_idx = ?
  `;
  conn.query(selectPostSql, [post_idx], async (err, rows) => { // async를 추가합니다
    if (err) {
      // 오류 처리
      console.error(err);
      return res.status(500).send("데이터베이스 에러");
    }

    if (rows.length === 0) {
      // 해당 게시글이 없을 경우 오류 메시지 출력
      return res.status(404).send("해당게시글이 없습니다.");
    }
    // 댓글 수를 가져옴
    let commentCount;
    try {
      commentCount = await getCommentCount(post_idx);
    } catch (err) {
      console.error(err);
      return res.status(500).send("데이터베이스 에러");
    }

    let selectCommentSql = `
      SELECT tb_comment.*, tb_user.user_name
      FROM tb_comment
      INNER JOIN tb_user ON tb_comment.user_id = tb_user.user_id
      WHERE tb_comment.b_idx = ?
      ORDER BY tb_comment.created_at ASC
    `;
    conn.query(selectCommentSql, [post_idx], (err, comments) => {
      if (err) {
        console.error(err);
        return res.status(500).send("데이터베이스 에러");
      }

      // 게시글 데이터와 댓글 데이터와 댓글 수를 detail 템플릿으로 전달
      res.render("screen/detail", {
        data: rows,
        loginUser: req.session.user || null,
        comments: comments,
        commentCount: commentCount,
      });
    });
  });
}

// 댓글 작성
router.post("/addComment", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send(`<script>alert('로그인을 해주세요!!');
    location.href="http://localhost:3000/"</script>`);
  }

  const post_idx = req.body.post_idx;
  const userid = req.session.user.user_id;
  const content = req.body.content;

  console.log(req.body.content);

  if (!post_idx || !content) {
    return res.status(400).send("글ID가 옳지 않습니다.");
  }

  let insertCommentSql = `
  INSERT INTO tb_comment (b_idx, cmt_content,created_at,user_id)
  VALUES (?, ?,NOW() ,?)
  `;
  conn.query(insertCommentSql, [post_idx, content,userid], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("데이터베이스 에러");
    }
    res.redirect("/detail?a=" + post_idx);
  });
});


// 나중에 group router 만들어야됨
router.get("/group", (req, res) => {
  res.render("screen/group");
});

module.exports = router;
