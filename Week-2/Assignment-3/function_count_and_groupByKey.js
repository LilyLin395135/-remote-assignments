//1. count: return an object which shows the count of each character.
//改寫法直接判斷某個key是不是存在陣列中，用in
function count01(input) {
    let result = {};
    for (let i = 0; i < input.length; i++) {
        if (input[i] in result) {
            result[input[i]] += 1;
        } else {
            result[input[i]] = 1;
        }
    }
    return result;
}

//改寫法直接判斷某個key是不是存在陣列中，用hasOwnProperty()
function count02(input) {
    let result = {};
    for (let i = 0; i < input.length; i++) {
        if (result.hasOwnProperty(input[i])) {
            result[input[i]] += 1;
        } else {
            result[input[i]] = 1;
        }
    }

//寫法一，用較嚴謹的if判斷式，來實現程式碼。
function count1(input) {
    //建立空的物件。javascript 物件是以(dictionary的方式) key-value pair 的方式儲存資料。
    let result = {};
    for (let i = 0; i < input.length; i++) {
        //如果result物件中沒有input[i]這個key
        if (result[input[i]] === undefined) {
            //javascript的object直接用"="賦值key的value。如果key不存在，會新增一組key-value pair。
            //方式一、Object["key"] = "value";
            //方是二、Object.key = "value";
            result[input[i]] = 1;
        }
        else {
            result[input[i]] += 1;
        }
    }
    return result;
}

//寫法二，用javascript特殊的if特性，來簡化程式碼。
function count2(input) {

    let result = {};
    for (let i = 0; i < input.length; i++) {
        //在JavaScript中，false、0、''、null、undefined和NaN(非數字)被視為假值(falsy value)。
        //當falsy value放進if語句會被視為false。
        //而除了以上六個"falsy value"之外的所有值都被視為 "truthy"，這點好神奇。
        //if判斷式放以下這些都會是truthy value：非零數字（包括正數和負數）、非空字串（包括空格 " "）、物件（包括空物件 {}）、陣列（包括空陣列 []）、函數（包括沒有返回值的函式）。布林值 true、特殊值 Infinity。
        if (result[input[i]]) {

            result[input[i]] += 1;
        } else {
            result[input[i]] = 1;
        }
    }
    return result;
}

//寫法三，用Map()來實現程式碼。
function count3(input) {
    let result = new Map();
    for (let i = 0; i < input.length; i++) {
        if (result.has(input[i])) {
            result.set(input[i], result.get(input[i]) + 1);
        } else {
            result.set(input[i], 1);
        }
    }
    return Object.fromEntries(result);//fromEntries()將每個鍵值對轉換成物件的格式。
}

let input1 = ["a", "b", "c", "a", "c", "a", "x"];
console.log(count01(input1));
console.log(count1(input1));
console.log(count2(input1));
console.log(count3(input1));


//2.groupByKey: return an object which shows the summed-up value of each key. the input may have the same key but different values, the output should have each key only once.
//寫法一，用較嚴謹的if判斷式，來實現程式碼。
function groupByKey1(input) {
    let result = {};
    for (let i = 0; i < input.length; i++) {
        if (result[input[i].key] === undefined) {
            result[input[i].key] = input[i].value;
        } else {
            result[input[i].key] += input[i].value;
        }
    }
    return result;
}

//寫法二，用javascript特殊的if特性，來簡化程式碼。
function groupByKey2(input) {
    let result = {};
    for (let i = 0; i < input.length; i++) {
        if (result[input[i].key]) {
            result[input[i].key] += input[i].value;
        } else {
            result[input[i].key] = input[i].value;
        }
    }
    return result;
}

//寫法三，用Map()來實現程式碼。
function groupByKey3(input) {
    let result = new Map();
    for (let i = 0; i < input.length; i++) {
        if (result.has(input[i].key)) {
            result.set(input[i].key, result.get(input[i].key) + input[i].value);
        } else {
            result.set(input[i].key, input[i].value);
        }
    }
    return Object.fromEntries(result);
}


let input2 = [
    { key: "a", value: 3 },
    { key: "b", value: 1 },
    { key: "c", value: 2 },
    { key: "a", value: 3 },
    { key: "c", value: 5 },
];

console.log(groupByKey1(input2));
console.log(groupByKey2(input2));
console.log(groupByKey3(input2));