const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.post("/wirte", (req, res) => {
  let {title, content, categoryMain, category, human, lastdate, selectedStacks} = req.body;

  let categoryJson;
  if (categoryMain !== "게시판") {
    const parsedSelectedStacks = JSON.parse(selectedStacks);
    let categoryArray = [category, human, lastdate, parsedSelectedStacks];
    categoryJson = JSON.stringify(categoryArray);
  } else {
    // '게시판'일 경우 빈 객체를 저장합니다.
    categoryJson = JSON.stringify({});
  }

  let sql = "INSERT INTO tb_board (b_title, b_content, created_at, b_type, b_category) VALUES (?, ?, NOW(), ?, ?)";
  conn.query(sql, [title, content, categoryMain, categoryJson], (err, rows) => {
    if (err) {
      console.error("Error:", err);
      res.send(`<script>alert("전송 실패");
                location.href="http://localhost:3000/"</script>`);
    } else {
      res.send(`<script>alert("업로드 되었습니다.");
        location.href="http://localhost:3000/"</script>`);
    }
  });
});

// 조회수

module.exports = router;