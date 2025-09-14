function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <span onclick="removeTask(${index})" style="cursor:pointer;color:red;">X</span>`;
    list.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("todo-input");
  if (input.value.trim() === "") return;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  loadTasks();
}
function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
const products = [
  { name: "Smartphone", category: "electronics", price: 20000, rating: 4.5 },
  { name: "T-Shirt", category: "clothing", price: 500, rating: 4.0 },
  { name: "Laptop", category: "electronics", price: 60000, rating: 4.8 },
  { name: "Novel", category: "books", price: 300, rating: 3.9 },
  { name: "Jeans", category: "clothing", price: 1200, rating: 4.3 }
];
function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<h4>${p.name}</h4><p>Category: ${p.category}</p><p>Price: ₹${p.price}</p><p>Rating: ${p.rating}</p>`;
    container.appendChild(div);
  });
}
function filterProducts() {
  const category = document.getElementById("category-filter").value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}
function sortProducts() {
  const sortType = document.getElementById("sort-filter").value;
  let sorted = [...products];
  if (sortType === "price") sorted.sort((a,b) => a.price - b.price);
  if (sortType === "rating") sorted.sort((a,b) => b.rating - a.rating);
  displayProducts(sorted);
}
window.onload = () => {
  loadTasks();
  displayProducts(products);
};
