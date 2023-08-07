const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.post("/wirte", (req, res) => {
  let {
    title,
    content,
    categoryMain,
    category,
    human,
    lastdate,
    selectedStacks,
  } = req.body;

  const parsedSelectedStacks = JSON.parse(selectedStacks);
  // 'category', 'human', 'lastdate', 'stack' 값들이 배열에 담깁니다.
  let categoryArray = [category, human, lastdate, parsedSelectedStacks];

  // 배열을 JSON 문자열로 변환
  let categoryJson = JSON.stringify(categoryArray);
  let sql =
    "INSERT INTO tb_board (b_title,b_content,created_at,b_type,b_category) VALUES (?,?,NOW(),?,?)";
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
