function alternateHook() {
    var hookContainer = document.querySelector('.hook-container');
    var hook = document.querySelector('.hook');

    hook.classList.add('hide');
    
    setTimeout(function() {
      if (hook.innerText === "FREE DELIVERY") {
        hook.innerText = "At Clint's stores";
      } else {
        hook.innerText = "FREE DELIVERY";
      }
      hook.classList.remove('hide');
    }, 1000);
}

setInterval(alternateHook, 5000);

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (window.pageYOffset > navbar.offsetTop) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});

function searchProducts(){
  let searchInput = document.getElementById("searchInput").value;
  if(searchInput === ""){
    location.reload();
    return;
  }
  fetch(serverUrl + "api/products/search/" + searchInput , {
      method : "GET",
      headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
      }
  }).then(response => response.json())
  .then(data => {
    let mainDiv = document.querySelector('.main');
    mainDiv.innerHTML = "";
    let searchResults = document.createElement('div');
    let searchTitle = document.createElement('h1');
    searchTitle.innerText = "Search Results";
    searchTitle.classList.add('category-title');
    searchResults.classList.add('search-results');
    mainDiv.appendChild(searchTitle);
    mainDiv.appendChild(searchResults);
    for(let i = 0; i < data.length; i++){
      let product = data[i];
      searchResults.innerHTML += `
          <div class="row-item" onclick="viewProduct('${product._id}')">
          <img src="${product.image}">
          <span>${product.name}</span>
          <span class="price">Ksh ${product.price}</span>
          </div>
      `;
    }
  })
}

document.getElementById("searchInput").addEventListener('input', searchProducts);
document.getElementById("searchBtn").addEventListener('click', searchProducts);

function viewProduct(productId){
  localStorage.setItem("productId" , productId);
  window.location.href = "product.html";
}

// implement cart functionality
let cart = JSON.parse(localStorage.getItem("cart"));

if(cart === null){
  cart = {
    products : [],
    total : 0
  };
  localStorage.setItem("cart" , JSON.stringify(cart));
}
else{
  document.getElementById("cart-filled").style.display = "inline";
}

async function addToCart(productId){
  let product = cart.products.find(item => item.productId === productId);
  if(product){
    product.quantity++;
  } else {
    product = await fetch(serverUrl + "api/products/" + productId , {
      method : "GET",
      headers : {
          "Content-Type" : "application/json",
          "Accept" : "application/json"
      }
    }).then(response => response.json())
    .then(data => {
      return data;
    });
    cart.products.push({
      productId : productId,
      quantity : 1,
      price : product.price
    });
  }
  cart.total += product.price;
  localStorage.setItem("cart" , JSON.stringify(cart));
  // item added popup div
  let popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerText = "Item added to cart";
  let icon = document.createElement('iconify-icon');
  icon.setAttribute('icon', 'carbon:checkmark-filled');
  icon.setAttribute('width', '70');
  icon.setAttribute('height', '70');
  popup.appendChild(icon);
  document.body.appendChild(popup);
  setTimeout(function(){
    popup.remove();
  }, 2000);
  location.reload();
}

function removeItemFromCart(productId){
  let product = cart.products.find(item => item.productId === productId);
  cart.total -= product.quantity * product.price;
  cart.products = cart.products.filter(item => item.productId !== productId);
  localStorage.setItem("cart" , JSON.stringify(cart));
  location.reload();
}

function removeOneItemFromCart(productId){
  let product = cart.products.find(item => item.productId === productId);
  if(product.quantity === 1){
    removeItemFromCart(productId);
    return;
  }
  product.quantity--;
  cart.total -= product.price;
  localStorage.setItem("cart" , JSON.stringify(cart));
  location.reload();
}