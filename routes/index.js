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

router.get("/join", (req, res) => {
  res.render("screen/join");
});

router.get("/write", (req, res) => {
  res.render("screen/write", { obj: req.session.user });
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
    let updateViewsSql = "UPDATE tb_board SET b_views = b_views + 1 WHERE b_idx = ?";
    conn.query(updateViewsSql, [post_idx], (err, result) => {
      if (err) {
        // 오류 처리
        console.error(err);
        return res.status(500).send("Database error");
      }

      // 해당 글에 대한 조회수를 이미 증가시켰음을 표시
      req.session.viewedPosts[post_idx] = true;

      // 조회수 업데이트 후 게시글 가져오기
      getPostDetail(post_idx, req,res);
    });
  } else {
    // 이미 조회한 글인 경우 조회수 증가 없이 게시글 가져오기
    getPostDetail(post_idx,req, res);
  }
});

// 게시글 가져오는 함수
function getPostDetail(post_idx,req, res) {
  let selectPostSql = `
    SELECT tb_board.*, tb_user.user_name
    FROM tb_board
    INNER JOIN tb_user ON tb_board.user_id = tb_user.user_id
    WHERE tb_board.b_permit = 'YES' AND tb_board.b_idx = ?
  `;
  conn.query(selectPostSql, [post_idx], (err, rows) => {
    if (err) {
      // 오류 처리
      console.error(err);
      return res.status(500).send("Database error");
    }

    if (rows.length === 0) {
      // 해당 게시글이 없을 경우 오류 메시지 출력
      return res.status(404).send("Post not found");
    }

    // 게시글 데이터를 detail 템플릿으로 전달
    res.render("screen/detail", { data: rows, loginUser: req.session.user || null });
  });
}

// 나중에 group router 만들어야됨
router.get("/group", (req, res) => {
  res.render("screen/group");
});

module.exports = router;
