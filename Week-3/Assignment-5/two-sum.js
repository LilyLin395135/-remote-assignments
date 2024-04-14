//Two Sum 的演算法是在一個數字陣列中找到兩個數字，使得這兩個數字的和等於一個特定的目標值。
//1.會先設定一個空的dictionary
//2.將目標值減去陣列中的數字，拿差值去dictionary中找，找到就回傳index，找不到就把數字存進dictionary。
//存進dictionary，就可以「用索引查找元素位置」Big O:是O(1)，1是用來表示和n無關，運算次數(運算時間)是固定的，不會因為n變大而變多。
//3.找到就return [dictionary[diff], index]
//Two Sum 的 Big O: 是O(n)，最多只要所有數字做一次就可以找到答案

function twoSum(numbers, target) {
  const dictionary = {};
  for (let i = 0; i < numbers.length; i++) {
    const difference = target - numbers[i];
    if (dictionary[difference] !== undefined) {
      return [dictionary[difference], i];
    }
    dictionary[numbers[i]] = i;
  }
  //如果找到符合條件的兩個數字，返回它们的Index。
  //如果沒有符合的兩個數字，就回傳沒有值相加等於目標值
  return `There is no two numbers that add up to ${target} in the array.`;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
//沒有符合的數字，所以回傳undefined
console.log(twoSum([2, 7, 11, 15], 10)); // There is no two numbers that add up to 10 in the array.
