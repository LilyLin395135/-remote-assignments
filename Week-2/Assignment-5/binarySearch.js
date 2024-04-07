//binarySearch 將數列照順序排後，每次都從中間開始猜，就能每次排除掉一半的數字，只要猜$ \log_{2} n$次答案就出來了。
function binarySearchPosition(numbers,target){

};

console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)); // should print 0
console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)); // should print 3