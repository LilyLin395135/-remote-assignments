//max: find the max value of an array of numbers.
function max(numbers){
    let max = numbers[0];
    for(let i = 1; i < numbers.length; i++){
        if(numbers[i] > max){
            max = numbers[i];
        }
    }
    return max;
}

//findPosition: find the first position of the target number inside an array of numbers. The position should be counted starting from 0, if you can't find the target, please return -1
function findPosition(numbers, target){
    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] === target){
            return i;
        }
    }
    return -1;
}

console.log(max([1, 2, 4, 5])); 
console.log(max([5, 2, 7, 1, 6])); 

console.log(findPosition([5, 2, 7, 1, 6], 5)); 
console.log(findPosition([5, 2, 7, 1, 6], 7)); 
console.log(findPosition([5, 2, 7, 7, 7, 1, 6], 7)); 
console.log(findPosition([5, 2, 7, 1, 6], 8)); 

