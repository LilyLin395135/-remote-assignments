function ajax(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {//onload會在xhr.readyState === 4時執行
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);//xhr.responseText是string，要轉成object
            callback(data);
        }
    };
    xhr.open("GET", src, true);//第三個參數是async，true是非同步
    xhr.send();//send request
}

function render(data) {
    const container = document.getElementById("product-container");
    data.forEach((product) => {
        const productDiv = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = product.name;
        const price = document.createElement("p");
        price.textContent = `Price: ${product.price}`;
        productDiv.appendChild(name);//<div>裡有<h3>和<p>
        productDiv.appendChild(price);
        container.appendChild(productDiv);//<div>裡有<h3>和<p>，再放到container裡
    });
}

ajax("https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products",//products是一個array
    function (response) {
        render(response);
    });
