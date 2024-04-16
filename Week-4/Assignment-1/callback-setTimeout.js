function delayedResult(n1, n2, delayTime, callback) {
    setTimeout(() => {
        callback(n1 + n2);
    }, delayTime);
}//setTimeout(callback, delay)

delayedResult(4, 5, 3000, function(result) {
    console.log(result);
}); // 9 (4+5) will be shown in the console after 3 seconds

delayedResult(-5, 10, 2000, function(result) {
    console.log(result);
}); // 5 (-5+10) will be shown in the console after 2 seconds

//Event Loop處理步驟：
//delayedResult(4, 5, 3000, function(result) {console.log(result);});被放入Call Stack
//delayedResult函數內部setTimeout被安排執行，將3000毫秒的延遲請求發送給瀏覽器去計時，setTimeout 自Call Stack中彈出，因為它的工作已經完成了。
//第二個delayedResult(-5, 10, 2000, function(result) { console.log(result);}); 被放入Call Stack
//第二個setTimeout被安排執行，將2000毫秒的延遲請求發送給瀏覽器去計時，然後 setTimeout 從Call Stack中彈出
//2秒鐘到了，第二個setTimeout的callback函數function(result) {console.log(result);}被放入Event Queue
//Call Stack是空的沒有其他JavaScript代碼正在執行，就從Event Queue取出callback函數放入Call Stack執行，印出5
//3秒鐘到了，第一個setTimeout的callback函數被放入Event Queue
//Call Stack是空的沒有其他JavaScript代碼正在執行，就從Event Queue取出callback函數放入Call Stack執行，印出9