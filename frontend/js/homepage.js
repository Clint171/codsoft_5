var trendingDiv = document.getElementById("trending");
var topDealsDiv = document.getElementById("topDeals");
var personalizedDiv = document.getElementById("personalized");

const serverUrl = "http://localhost:3000/";

function getProducts(){
    fetch(serverUrl + "api/products" , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    
    })
    .then(response => response.json())
    .then(data => {
        trendingDiv.innerHTML = "";
        topDealsDiv.innerHTML = "";
        personalizedDiv.innerHTML = "";
        displayProducts(data);
    })
    .catch(error => {
        console.log(error);
    });
}

function displayProducts(data){
    //data is an array of products

    // product example :
    // {
    //     "_id": "663a24ac1fb97370499de34c",
    //     "name": "Iphone 12",
    //     "description": "Apple Iphone 12",
    //     "price": 80000,
    //     "image": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
    //     "__v": 0
    // }

    for(let i = 0; i < data.length; i++){
        let product = data[i];
        trendingDiv.innerHTML += `
            <div class="row-item" onclick="viewProduct('${product._id}')">
            <img src="${product.image}">
            <span>${product.name}</span>
            <span class="price">Ksh ${product.price}</span>
            </div>
        `;
        topDealsDiv.innerHTML += `
            <div class="row-item" onclick="viewProduct('${product._id}')">
            <img src="${product.image}">
            <span>${product.name}</span>
            <span class="price">Ksh ${product.price}</span>
            </div>
        `;
        personalizedDiv.innerHTML += `
            <div class="row-item" onclick="viewProduct('${product._id}')">
            <img src="${product.image}">
            <span>${product.name}</span>
            <span class="price">Ksh ${product.price}</span>
            </div>
        `;
    }
}

getProducts();