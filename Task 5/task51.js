const products = [
  {id:1, name:"Smartphone", price:299, img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw9b938kxPmYIdg03Ch5wgcHt7oM1SF2FrHNd9R_9GA-a-EKl9YobvVMUdixlR9-pp_nbqH5alMfYdzODEFud2FYXfN3sBtw"},
  {id:2, name:"Laptop", price:799, img:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTlkfwXsDUySrwpt1fOJkDUGwnGwKMZ6nZSF8bc4ha-yRoh6hB9nSwDmoowC0KL3XR37266_wNU_1UPPQJgyEWbmPXPDJvPvjjqgYfmDOqmWWai-hHFtYXIZQ"},
  {id:3, name:"Headphones", price:49, img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQLH0qzVDGIhbgQZjmXOWWmD8o-5_f4yRW-iOSdDq5vvh9hv1ZY65w1iX_7MsltPQULuYLq6iRERWYHh9U_pAh9FiDMCf_cVI3DOszwwzHcsL7AbiVxJMO5"},
  {id:4, name:"Smartwatch", price:199, img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwaFAvoxoBkX-PzHFrYsTehZG6_MbYl91rlpcNLz_L8qvWT1ZNcHLGnYiFeSwK1DGPyp-rlBLMTKn0oEcwft_lDOg8iHGgSwPQFloPJcmm"}
];

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];

function renderProducts() {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img data-src="${product.img}" alt="${product.name}" class="lazy">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
  lazyLoadImages();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach((item,index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });
  cartCount.innerText = cart.length;
  const total = cart.reduce((sum,item)=>sum+item.price,0);
  cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index,1);
  updateCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if(cart.length>0){
    alert("Thank you for your purchase!");
    cart=[];
    updateCart();
  } else {
    alert("Cart is empty!");
  }
});

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll(".lazy");
  const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => observer.observe(img));
}

renderProducts();
