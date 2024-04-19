function delayedResultPromise(n1, n2, delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //如果是非數字的話就reject，回傳error
            if(isNaN(n1) || isNaN(n2)){
                reject(Error('Please input number only'));
            }
            else{
            resolve(n1 + n2);
            }
        }, delayTime);
    });
}


delayedResultPromise(4, 5, 3000).then(console.log); // 9 (4+5) will be shown in the console after 3 seconds
delayedResultPromise(-5, 10, 2000).then(console.log); // 5 (-5+10) will be shown in the console after 2 seconds
delayedResultPromise(-5, 'a', 2000).then(console.log).catch(console.log);//Please input number only