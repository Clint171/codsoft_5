cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null;

const serverUrl = "http://localhost:3000/";

if(cart === null){
    location.href = "home.html";
}

let fetchOptions = {
    method : "POST",
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    body : JSON.stringify({products : cart.products})
}

fetch(serverUrl + "api/orders/createOrder" , fetchOptions)
.then(response => response.json())
.then(data => {
    document.getElementById("total").innerText = "Ksh " + data.amount;
    document.getElementById("price").innerText = "Ksh " + data.amount;
    localStorage.setItem("orderId" , data._id);
});

function placeOrder(){
    let orderId = localStorage.getItem("orderId");
    fetch(serverUrl + "api/orders/checkOut/" + orderId , {method : "POST"})
    .then(response => {
        if(response.status === 200){
            localStorage.removeItem("cart");
            localStorage.removeItem("orderId");
            location.href = "order-placed.html";
        }
        else{
            alert("Some error occured. Please try again later");
        }
    })
}