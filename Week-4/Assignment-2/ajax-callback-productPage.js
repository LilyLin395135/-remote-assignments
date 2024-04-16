function ajax(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.open("GET", src, true);
    xhr.send();
}

function render(data) {
    const container = document.getElementById("product-container");
    data.forEach((product) => {
        const productDiv = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = product.name;
        const price = document.createElement("p");
        price.textContent = `Price: ${product.price}`;
        productDiv.appendChild(name);
        productDiv.appendChild(price);
        container.appendChild(productDiv);
    });
}

ajax("https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products", 
function(response) {
    render(response);
});
