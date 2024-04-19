async function main() {
    //should call delayResultPromise and get the result using async/await
    try{
    const result1 = await delayResultPromise(4, 5, 3000);
    console.log(result1);

    const result2 = await delayResultPromise(-5, 10, 2000);
    console.log(result2);

    const result3 = await delayResultPromise(-5, 'a', 2000).catch(console.log);
    console.log(result3);
    }
    catch(error){
        console.log("Error: ",error);
    }
}

main();

function delayResultPromise(n1, n2, delayTime) {
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