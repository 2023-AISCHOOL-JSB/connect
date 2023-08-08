const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.post("/wirte", (req, res) => {
  let {title, content, categoryMain, category, human, lastdate, selectedStacks} = req.body;
  let userid = req.session.user.user_id
  let categoryJson;
  if (categoryMain !== "게시판") {
    const parsedSelectedStacks = JSON.parse(selectedStacks);
    let categoryArray = [category, human, lastdate, parsedSelectedStacks];
    categoryJson = JSON.stringify(categoryArray);
  } else {
    // '게시판'일 경우 빈 객체를 저장합니다.
    categoryJson = JSON.stringify({});
  }

  let sql = "INSERT INTO tb_board (b_title, b_content, created_at,user_id, b_type, b_category) VALUES (?, ?, NOW(), ?,?, ?)";
  conn.query(sql, [title, content, userid, categoryMain, categoryJson], (err, rows) => {
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

// 회원가입 기능 라우터
router.post('/join', (req, res) => {
  console.log('회원가입 기능 라우터', req.body)
  // 1. join.html 에서 받아온 id,pw,name,address를 각각의 변수에 저장
  let { name, id, git,phone, pw,pw2, process1} = req.body
  console.log(name, id, git,phone, pw,pw2, process1)
  // 2. 비밀번호와, 비밀번호 확인 데이터가 같으면 회원가입 로직으로
  // 3. DB 연동 작업 = insert into 테이블명 values (아이디, 비번, 이름, 주소)
  
  if (pw === pw2) {
      let sql = "insert into tb_user values (?,SHA2(?,512),?,?,?,?,'y',now(),'uu')"
      conn.query(sql, [id, pw, name,git,phone,process1], (err, rows) => {
          console.log('회원가입 결과',rows)
          if(rows.affectedRows>0){
              res.send(`<script>alert('회원가입 성공했습니다 로그인해주세요')
                  location.href="http://localhost:3000/"</script>`)
          }    
     // 4. 만약 회원가입에 성공하면 alert로 회원가입 성공! => 메인창 이동
      })
  } else {
      res.send(`<script>alert("비밀번호 확인이 다릅니다.")
      location.href="http://localhost:3000/join"</script>`)
  }
  // 5. 만약 회원가입에 실패하면 alert로 회원가입 실패 ... => 회원가입 창으로 이동

  // **참고
  // 07.DB => 회원가입 로직
  // 07. DB 참고 끝났으면 바로바로 폴더 닫아주세요! ★★★

})


// 로그인 기능 라우터
router.post('/login', (req,res)=>{
  // 1.layout.html 에서 login Box 안의 데이터를 받아온다 (id,pw)
  // 2. 그 데이터들을 각각 id, pw 변수 안에 저장
  console.log('로그인 기능 라우터',req.body)
  let {id,pw} = req.body
  // 3. DB 연동해서 해당 id 값과 pw 값이 일치하는 데이터가 DB에 있는지 확인한다
  let sql = 'select * from tb_user where user_id=? and user_pw =SHA2(?,512)'
  // 4. 데이터가 존재한다면 로그인 성공
  conn.query(sql,[id,pw],(err, rows)=>{
  
      if(rows.length > 0){
         console.log('로그인 성공!', rows)
         if(req.body.autologin != undefined){
          req.session.user = rows[0];
          // 자동 로그인이 체크되었다면, 쿠키의 만료 시간을 14일 후로 설정합니다.
          req.session.cookie.expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
          req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
        } else {
          console.log('자동 로그인 안함');
          // 자동 로그인이 체크되지 않았다면, 쿠키의 만료 시간을 30분 후로 설정합니다.
          req.session.cookie.expires = new Date(Date.now() + 100* 1000);
          req.session.cookie.maxAge = 100 * 1000;
          req.session.user = rows[0];
        }
          
         res.send(`<script>alert("환영합니다");
         location.href="http://localhost:3000/"</script>`)
      } else {
         console.log('로그인 실패!')
         res.send(`<script>alert("아이디/비밀번호를 다시 확인해주세여.");
         location.href="http://localhost:3000/"</script>`)
      }

   })
  //     4-2) 로그인이 성공했다면, 해당 유저의 정보를 세션에 저장(id, nick, address)
  //     4-3) 환영합니다! alert => 메인으로 이동
  // 5. 데이터가 존재하지 않는다면 로그인 실패
})

// 로그아웃 기능 라우터
router.get('/logout',(req,res)=>{
  // 1. 세션 삭제
  req.session.destroy()
  // 2. 메인페이지에 다시 접근
  res.send(`<script>location.href="http://localhost:3000/"</script>`)
})

module.exports = router;