//count how many ‘a’ and ‘b’ letters are in the given input and return the total number
function countAandB (input){
    let countA = 0;
    let countB = 0;
    let aLetters='letters';
    let bLetters='letters';
    for (let i = 0; i < input.length; i++){
        if (input[i] === 'a'){
            countA++;
        }
        if (input[i] === 'b'){
            countB++;
        }
    }
    if(countA===0 && countB===0){
        return 0
    }
    if(countA<=1){
        aLetters='letter';
    }
    if(countB<=1){
        bLetters='letter';
    }
    return `${countA + countB} (${countA} 'a' ${aLetters} and ${countB} 'b' ${bLetters})`;
}

//convert English letters to numbers, let ‘a’ to be 1, ‘b’ to be 2, and so on.
function convertToNumber(input){
    let result = [];
    for (let i = 0; i < input.length; i++){
        result.push(input[i].charCodeAt(0)-96);
        //push()將元素加到陣列的最後
        //charCodeAt()返回指定位置的char字元的Unicode
    }
    return JSON.stringify(result);
    //JSON.stringify()將JavaScript值轉換成JSON字串，就不會返回陣列內的元素個素
}

let input1 = ['a','b','c','a','c','a','c'];
console.log(countAandB(input1));
console.log(convertToNumber(input1));

let input2=['e','d','c','d','e'];
console.log(countAandB(input2));
console.log(convertToNumber(input2));