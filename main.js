const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(url)
  .then((res) => res.json())
  .then(restaurant);
let a = [];

function restaurant(array) {
  let list = document.getElementById("categories");

  array.forEach((element) => {
    let li = document.createElement("li");
    li.className = "nav-item";
    let a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = array.name;

    li.appendChild(a);
    list.appendChild(li);
  });

  let divCards = document.getElementById("products");

  let quantity = [];
  document.querySelectorAll(".nav-link").forEach((item) => {
    item.addEventListener("click", (event) => {
      let category = event.target.text;
      let title = document.getElementById("titleCategory");
      title.textContent = category;
      let categories = array.find((elementF) => elementF.name == category);

      while (divCards.lastElementChild) {
        divCards.removeChild(divCards.lastElementChild);
      }
    });
  });
}

let numItems = 0;
let itemCar = document.getElementById("itemsAdd");

function clearCar() {
  itemCar.textContent = 0 + " items";
  numItems = 0;
}

function countItems(item, quantity) {
  itemCar.textContent = numItems + 1 + " items";
  let found = quantity.find((elementFood) => elementFood.food == item.name);
  if (found === undefined) {
    let event = {};
    event["food"] = item.name;
    event["quantity"] = 1;
    event["unitPrice"] = item.price;
    event["amount"] = item.price;
    quantity.push(event);
  } else {
    found.quantity++;
    found.amount = found.quantity * found.unitPrice;
  }
  numItems = numItems + 1;
}

function addItems(item) {
  a.push(item);
}
