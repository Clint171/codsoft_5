let productId = localStorage.getItem("productId");
const serverUrl = "http://localhost:3000/";

if(productId === null){
    window.location.href = "home.html";
}

fetch(serverUrl + "api/products/" + productId , {
    method : "GET",
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
}).then(response => response.json())
.then(data => {
    displayProduct(data);
})

function displayProduct(product){
    let mainDiv = document.querySelector(".main");
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart === null){
        cart = {
          products : [],
          total : 0
        };
      }
    let productInCart = cart.products.find(item => item.productId === productId);
    let qty = 0;
    let total = 0;
    if(productInCart){
        qty = productInCart.quantity;
        total = productInCart.quantity * product.price;
    }
    mainDiv.innerHTML = `
        <div class="product">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
                <h1>${product.name}</h1>
            <div class="product-info">
                <span class="price">Ksh ${product.price}</span>
                <div class="qty-div">
                    <p>Quantity: <span id="pricing">${qty}</span></p>
                    <div><iconify-icon icon="carbon:add-filled" width="40" height="40" onclick='addToCart("${localStorage.getItem('productId')}")'></iconify-icon> <iconify-icon icon="carbon:subtract-filled" width="40" height="40" onclick='removeOneItemFromCart("${localStorage.getItem('productId')}")'></iconify-icon></div>
                    <p class="price">Total: Ksh <span id="total">${total}</span></p>
                </div>
                <button class="add-to-cart" onclick='addToCart("${localStorage.getItem('productId')}")'>Add to Cart</button>
            </div>
        </div>
        <div class="product-description">
            <h2>Description</h2>
            <p>${product.description}</p>
        </div>
   `;
}