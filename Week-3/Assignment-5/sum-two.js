//Given an array of integers, return indices of the two numbers such that they add up to a specific target. 
//You may assume that each input would have exactly one solution, and you may not use the same element twice.
//Two Sum 的演算法是在一個數字陣列中找到兩個數字，使得這兩個數字的和等於一個特定的目標值。
//1.會先設定一個空的dictionary
//2.將目標值減去陣列中的數字，拿差值去dictionary中找，找到就回傳index，找不到就把數字存進dictionary。
//存進dictionary的好處就是可以直接確認有沒有這個key存在，不用再for loop一次。
//3.找到就return [dictionary[diff], index]
//Big O: O(n)只要for loop一次就可以找到答案

function twoSum(numbers, target) {
  const dict = {};
  for (let i = 0; i < numbers.length; i++) {
    const diff = target - numbers[i];
    if (dict[diff] !== undefined) {
      return [dict[diff], i];
    }
    dict[numbers[i]] = i;
  }
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]