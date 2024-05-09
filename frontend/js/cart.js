const serverUrl = "http://localhost:3000/";

if(cart === null){
    location.href = "home.html";
}

let cartElement = document.querySelector(".cart");


cartElement.innerHTML = ``;

cart.products.forEach(async item => {
    let dbItem = await fetch(serverUrl + "api/products/" + item.productId , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    });
    cartElement.innerHTML += `
        <div class="cart-item">
            <img src="${dbItem.image}">
            <div class="cart-item-info">
                <h2>${dbItem.name}</h2>
                <span class="price">Ksh ${dbItem.price}</span>
                <div class="qty-div">
                    <p>Quantity: <span id="pricing">${item.quantity}</span></p>
                    <div><iconify-icon icon="carbon:add-filled" width="40" height="40" onclick="addToCart('${item.productId}')"></iconify-icon> <iconify-icon icon="carbon:subtract-filled" width="40" height="40" onclick="removeOneItemFromCart('${item.productId}')"></iconify-icon></div>
                    <p>Total: <span id="total">Ksh ${dbItem.price * item.quantity}</span></p>
                    <button class="remove-btn" onclick='removeItemFromCart("${item.productId}")'>Remove</button>
                </div>
            </div>
        </div>
    `;
});

document.getElementById("subtotal").innerText = `Ksh ${cart.total}`;
document.getElementById("total").innerText = `Ksh ${cart.total}`;

function goToCheckout(){
    localStorage.setItem("cart" , JSON.stringify(cart));
    location.href = "payment.html";
}