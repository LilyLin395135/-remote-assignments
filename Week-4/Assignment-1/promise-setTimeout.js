function delayedResultPromise(n1, n2, delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n1 + n2);
        }, delayTime);
    });
}


delayedResultPromise(4, 5, 3000).then(console.log); // 9 (4+5) will be shown in the console after 3 seconds
delayedResultPromise(-5, 10, 2000).then(console.log); // 5 (-5+10) will be shown in the console after 2 seconds

//需要等待的操作會用promise來處理，跟前面的callback一樣會放進Event Queue
//等待Call Stack空了之後再抓Queue的先進先出來執行。