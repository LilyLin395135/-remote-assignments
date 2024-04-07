//binarySearch目的是有效率的找出數字。(若數列沒照順序排就不是有效率地找數字了)
//必須先將數列照順序排後，每次都從中間開始猜，就能每次排除掉一半的數字，只要猜$ \log_{2} n$次答案就出來了。
function binarySearchPosition(numbers,target){
    let startIndex = 0;
    let endIndex = numbers.length - 1;

    //當startIndex <= endIndex時，代表還有數字可以繼續猜
    while(startIndex <= endIndex){
        //每回都取中間值(無條件捨去)
        let middle = Math.floor((startIndex + endIndex) / 2);
        if(numbers[middle] === target){
            return middle;
        }
        //如果中間值小於目標值，代表目標值在右邊
        else if(numbers[middle] < target){
            startIndex = middle + 1;
        }
        //如果中間值大於目標值，代表目標值在左邊
        else{
            endIndex = middle - 1;
        }
    }
    return -1;
};

console.log(binarySearchPosition([1, 2, 5, 6, 7], 1)); // should print 0
//一開始endIndex=4, startIndex=0, middle=2, numbers[2]=5, 5>1, endIndex=2-1
//startIndex=0, endIndex=1, middle=0, numbers[0]=1, 1=1, return 0

console.log(binarySearchPosition([1, 2, 5, 6, 7], 6)); // should print 3
//一開始endIndex=4, startIndex=0, middle=2, numbers[2]=5, 5<6, startIndex=2+1
//startIndex=3, endIndex=4, middle=3, numbers[3]=6, 6=6, return 3

console.log(binarySearchPosition([1, 2, 5, 6, 7], 0)); // should print -1
//一開始endIndex=4, startIndex=0, middle=2, numbers[2]=5, 5>0, endIndex=2-1
//startIndex=0, endIndex=-1, return -1

console.log(binarySearchPosition([1, 2, 5, 6, 7], 7)); // should print 4
//一開始endIndex=4, startIndex=0, middle=2, numbers[2]=5, 5<7, startIndex=2+1
//startIndex=3, endIndex=4, middle=3, numbers[3]=6, 6<7, startIndex=3+1
//startIndex=4, endIndex=4, middle=4, numbers[4]=7, 7=7, return 4