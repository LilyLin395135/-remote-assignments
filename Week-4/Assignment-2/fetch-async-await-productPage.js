const productUrl = "https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products";
const productList = document.getElementById("product-container");


async function getProducts(url) {
    try {
        const response = await fetch(url);
        const productsJSON = await response.json();
        return productsJSON;
    }
    catch (error) {
        console.log("Error: ", error);
    }
};

function render(data) {
    data.forEach((product) => {
        const productDiv = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = product.name;
        const price = document.createElement("p");
        price.textContent = `Price: ${product.price}`;
        productDiv.appendChild(name);//<div>裡有<h3>和<p>
        productDiv.appendChild(price);
        productList.appendChild(productDiv);//<div>裡有<h3>和<p>，再放到container裡
    });
}

getProducts(productUrl)
    .then(render)
    .catch(e=>{
        //放錯誤訊息"Something went wrong!"在畫面
        productList.innerHTML = "<h3>Something went wrong!</h3>";
        console.log("Error: ", e);
    });
