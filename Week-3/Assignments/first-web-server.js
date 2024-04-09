//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立get方法的 '/' router
app.get('/', (req, res) => {
    //到index.html頁面
    res.sendFile(__dirname + '/index.html');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回html頁面。

//設定伺服器監聽的port
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000 or you can use http://127.0.0.1:3000');
});//當伺服器啟動後，輸出這句話
//以上在CLI 輸入node first-web-server.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000，就會看到網頁Hello Express!! Hello, My Server!
//ctrl+c 關閉伺服器