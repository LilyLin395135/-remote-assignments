//導入express
const express = require("express");
const cookieParser = require("cookie-parser");

//建立一個express伺服器
const app = express();
app.use(cookieParser());

//Assignment-1：建立get方法的 '/' router，開啟html頁面
app.get("/", (req, res) => {
  //到index.html頁面
  res.sendFile(__dirname + "/index.html");
});

//Assignment-2：http://localhost:3000/data?number={number}, should get the result of 1+2+....+{number} on the page.
app.get("/data", (req, res) => {
  //req包含的客戶端請求屬性：url、params、query、headers、body、method
  //query用於解析url中的query string，如果URL是/data?number=10，query將包含一個属性number，其值為10。
  const number = req.query.number;

  if (number === undefined) {
    //undefined已宣告但未賦值
    res.send("Lack of Parameter"); //res.send()發送響應給客戶，會在瀏覽器上看到。
  } else if (isNaN(number)) {
    res.send("Wrong Parameter");
  } else {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
    }
    res.send(`Result: ${sum}`);
  }
});

//Assignment-4：HTTP cookie
//目的：顯示使用者名字。(從cookie撈名字，cookie沒有就給路徑填表單存去cookie)
app.get("/myName", (req, res) => {
  const name = req.cookies.name; //需安裝cookie-parser套件，取得cookie的值
  if (name) {
    //truthy
    res.send(
      `<h3 style="text-align: center;">I'm so glad to see you here, ${name}🤩</h3>`
    );
  } else {
    res.sendFile(__dirname + "/name-submission-form.html"); //導到name-submission-form.html頁面
  }
});

//目的：收取使用者提交的表單，並存名字進cookie。
//再轉回給/myName，這時/myName也能從cookie撈得到資料了。
app.get("/trackName", (req, res) => {
  const name = req.query.name;
  res.cookie("name", name);
  res.redirect("/myName");
});

//設定伺服器監聽的port
app.listen(3000, () => {
  console.log(
    "Server is running at http://localhost:3000 or you can use http://127.0.0.1:3000"
  );
}); //當伺服器啟動後，輸出這句話
//以上在CLI 輸入node first-web-server.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000，就會看到網頁Hello Express!! Hello, My Server!
//ctrl+c 關閉伺服器