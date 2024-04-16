
const cors =require("cors");//遇到cors跨域錯誤，導入cors套件
const express = require("express");//導入express
const cookieParser = require("cookie-parser");//cookie

//cors預設全部開放，也可以設定只開放某些網址
//即使是小的差别，如使用127.0.0.1代替localhost，也會被視為CORS请求。
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();//建立一個express伺服器
app.use(cookieParser());//cookie
app.use(cors(corsOptions));//跨來源資源共用+限制網址

//Assignment-1：建立get方法的 '/' router，開啟html頁面
app.get("/", (request, response) => {
  //到index.html頁面
  response.sendFile(__dirname + "/index.html");
});

//Assignment-2：http://localhost:3000/data?number={number}, should get the result of 1+2+....+{number} on the page.
app.get("/data", (request, response) => {
  //req包含的客戶端請求屬性：url、params、query、headers、body、method
  //query用於解析url中的query string，如果URL是/data?number=10，query將包含一個属性number，其值為10。
  const number = request.query.number;

  if (number === undefined) {
    //undefined已宣告但未賦值
    response.send("Lack of Parameter"); //res.send()發送響應給客戶，會在瀏覽器上看到。
  } 
  else if (isNaN(number)||number<0) {
    response.send("Wrong Parameter");
  } 
  else {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
    }
    response.send(`Result: ${sum}`);
  }
});

//Assignment-3
//static file middleware設置，將public資料夾設為靜態資源目錄
app.use(express.static(__dirname + "/public"));

//Assignment-4：HTTP cookie
//目的：顯示使用者名字。(從cookie撈名字，cookie沒有就給路徑填表單存去cookie)
app.get("/myName", (request, response) => {
  const name = request.cookies.name; //需安裝cookie-parser套件，取得cookie的值
  if (name) {
    //truthy
    response.send(
      `<h3 style="text-align: center;">I'm so glad to see you here, ${name}🤩</h3>`
    );
  } else {
    response.sendFile(__dirname + "/name-submission-form.html"); //導到name-submission-form.html頁面
  }
});

//目的：收取使用者提交的表單，並存名字進cookie。
//再轉回給/myName，這時/myName也能從cookie撈得到資料了。
app.get("/trackName", (request, response) => {
  const name = request.query.name;
  response.cookie("name", name,{
    httpOnly: true, //禁止JavaScript讀取cookie
    secure: true, //只在https下傳輸
    sameSite: 'None', //嚴格限制第三方 Cookie
    maxAge:86400000 //設置cookie的有效時間24小時
  });
  response.redirect("/myName");
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