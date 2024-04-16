async function main() {
    //should call delayResultPromise and get the result using async/await
    const result1 = await delayResultPromise(4, 5, 3000);
    const result2 = await delayResultPromise(-5, 10, 2000);
    console.log(result1);
    console.log(result2);
}

main();

function delayResultPromise(n1, n2, delayTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n1 + n2);
        }, delayTime);
    });
}
