//ES Modules方式注入
import express from "express";
import { getUsers, getUserById, getUserByEmail, getUserByEmailAndPassword, createUser } from "./database.js";

//啟用一個Express應用程式
const app = express();
app.use(express.json()); //使用express.json() middleware 解析request.body中的JSON資料
app.use(express.urlencoded({ extended: true })); //使用express.urlencoded() middleware 解析請求主體中的urlencoded資料

//首頁，包含註冊和登入表單
app.get("/", (request, response) => {
  const errorMessage = request.query.error; // 從查詢字串中獲取錯誤訊息
  response.send(`
  <h1>Home Page</h1>
  ${errorMessage ? `<p style="color:red;">${errorMessage}</p>` : ""}
  <form method="post" action="/signup">
    <input type="email" name="email" placeholder="Enter your email" required />
    <input type="password" name="password" placeholder="Enter your password" required />
    <button type="submit">Sign Up</button>
  </form>
  <form method="post" action="/signin">
    <input type="email" name="email" placeholder="Enter your email" required />
    <input type="password" name="password" placeholder="Enter your password" required />
    <button type="submit">Sign In</button>
  </form>
`);
});

// 註冊處理
app.post("/signup", async (request, response) => {
  const { email, password } = request.body;
  //如果email已經存在，回傳email已經註冊過
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return response.redirect("/?error=Email+already+registered");
  }
  //email不存在，建立新用戶，並登入member頁面
  await createUser(email, password);
  response.redirect("/member");
});

// 登入處理
app.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  //如果email不存在，回傳email尚未註冊，請先註冊
  const user = await getUserByEmail(email);
  if (!user) {
    return response.redirect("/?error=Email+not+registered,+please+sign+up");
  }
  //如果email存在，但密碼不正確，回傳密碼不正確
  const validUser = await getUserByEmailAndPassword(email, password);
  if (!validUser) {
    return response.redirect("/?error=Password+incorrect");
  }
  //email存在且密碼正確，登入member頁面
  response.redirect("/member");
});

//會員頁面
app.get("/member", (request, response) => {
  response.send("<h1>Welcome to Member Page!</h1>");
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
  console.log(
    "Server is running at http://localhost:3000 or http://127.0.0.1:3000/"
  );
});
