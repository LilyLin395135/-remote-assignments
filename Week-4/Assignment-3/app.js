//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");
const pool = require("./database");

//啟用一個Express應用程式
const app = express();
app.use(express.json()); //使用express.json() middleware 解析請求主體中的JSON資料
app.use(express.urlencoded({ extended: true })); //使用express.urlencoded() middleware 解析請求主體中的urlencoded資料

//使用非同步函數，確保資料庫連線成功後，再啟動伺服器
async function databaseQuery(query, params) {
  try {
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Database query error: ", error);
    return null; // 回傳 null 或其他標示當查詢失敗時
  }
}

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
  const rows = await databaseQuery("SELECT id FROM user WHERE email = ?", [
    email,
  ]);
  if (!rows) {
    return response.redirect("/?error=Database+query+failed");
  }
  if (rows.length > 0) {
    response.redirect("/?error=Email+already+registered");
  } else {
    await databaseQuery("INSERT INTO user (email, password) VALUES (?, ?)", [
      email,
      password,
    ]);
    response.redirect("/member");
  }
});

// 登入處理
app.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  const rows = await databaseQuery("SELECT id FROM user WHERE email = ?", [
    email,
  ]);
  if (!rows || rows.length === 0) {
    // 沒有找到電子郵件，即用戶尚未註冊
    response.redirect("/?error=Email+not+registered,+please+sign+up");
  } else {
    const match = await databaseQuery(
      "SELECT id FROM user WHERE email = ? AND password = ?",
      [email, password]
    );
    if (match.length > 0) {
      response.redirect("/member");
    } else {
      response.redirect("/?error=Password+incorrect");
    }
  }
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
