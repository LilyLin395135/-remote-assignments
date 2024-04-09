//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立get方法的 '/' router
app.get('/', (req, res) => {
    //到index.html頁面
    res.sendFile(__dirname + '/index.html');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回html頁面。

//1. user enters http://localhost:3000/data , show a "Lack of Parameter" message
//2. user enters http://localhost:3000/data?number=xyz, shows a "Wrong Parameter" message
//3. user enters http://localhost:3000/data?number=5, they should get the result of 1+2+....+5 on the page.
app.get('/data', (req, res) => {
    //req包含的客戶端請求屬性：url、params、query、headers、body、method
    //query用於解析url中的query string，如果URL是/data?number=10，query將包含一個属性number，其值為10。
    const number = req.query.number; 

    if (number === undefined) { //undefined已宣告但未賦值
        res.send('Lack of Parameter'); //res.send()發送響應給客戶，會在瀏覽器上看到。
    }
    else if (isNaN(number)) {
        res.send('Wrong Parameter');
    }
    else {
        let sum = 0;
        for (let i = 1; i <= number; i++) {
            sum += i;
        }
        res.send(`Result: ${sum}`);
    }
});

//設定伺服器監聽的port
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000 or you can use http://127.0.0.1:3000');
});//當伺服器啟動後，輸出這句話
//以上在CLI 輸入node first-web-server.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000，就會看到網頁Hello Express!! Hello, My Server!
//ctrl+c 關閉伺服器