const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const groupRouter = require("./routes/group");
const chatRouter = require("./routes/chat");


const cors = require("cors");

/* CORS 오류 발생! 
1) cors 설치 npm i cors
2) require
3) 미들웨어 등록
*/
app.use(express.json());
app.use(cors());

// 1. port 번호 설정
app.set("port", process.env.PORT || 3000);

// 2. 동적인 페이지 설정 - nunjucks
app.set("view engine", "html");
const env = nunjucks.configure("views", {
  express: app,
  watch: true,
});
// html태그 제거기능
env.addFilter('stripHtmlTags', function (str) {
  return str.replace(/<[^>]+>/gm, ""); // 기존 정규식에 옵션 `m` 추가(여러 줄 처리)
});

// 3. post방식으로 데이터를 넘겨줄 때 필요함
app.use(bodyParser.urlencoded({ extended: true }));

// 4. 정적인 파일들 public에 접근
app.use(express.static(__dirname + "/public"));

// 5. 세션 저장소 관리
app.use(
  session({
    httpOnly: true,
    resave: false,
    secret: "secret",
    store: new fileStore(),
  })
);


// 6. 라우팅 처리
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/chat", chatRouter);


app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 포트에서 대기중...");
});
