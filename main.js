const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let a = [];

let items = 0;
let car = document.getElementById("itemsAdd");

function clearCar() {
  car.textContent = 0 + " items";
  items = 0;
}

function count(item, quantity) {
  car.textContent = items + 1 + " items";
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
  items = items + 1;
}

function descount() {
  car.textContent = items - 1 + " items";
}

function add(item) {
  a.push(item);
}

function recalTotalA(quantity) {
  let total = 0;
  quantity.forEach((element) => {
    total += element.amount;
  });
  return total;
}

function recalTotalD(quantity) {
  let total = 0;
  quantity.forEach((element) => {
    total -= -element.amount;
  });
  return total;
}

fetch(url)
  .then((res) => res.json())
  .then(restaurant);

function restaurant(array) {
  let listCategories = document.getElementById("listCategories");

  array.forEach((foodCategorie) => {
    let li = document.createElement("li");
    li.className = "nav-item ";
    let a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = foodCategorie.name;

    li.appendChild(a);

    listCategories.appendChild(li);
  });

  let divProductsCards = document.getElementById("products");

  let tableItems = document.getElementById("tableItems");

  let optionsItems = document.getElementById("optionsItems");

  let quantity = [];

  document.querySelectorAll(".nav-link").forEach((itemNav) => {
    itemNav.addEventListener("click", (event) => {
      let category = event.target.text;

      let titleCategory = document.getElementById("titleCategory");
      titleCategory.textContent = category;

      let listCategory = array.find(
        (elementFood) => elementFood.name == category
      );

      while (divProductsCards.lastElementChild) {
        divProductsCards.removeChild(divProductsCards.lastElementChild);
      }

      listCategory.products.forEach((item) => {
        let divCard = document.createElement("div");
        divCard.className = "card cardItem";
        divCard.setAttribute("style", "width: 18rem;");
        let imgCard = document.createElement("img");
        imgCard.className = "card-img-top imgFood";
        imgCard.setAttribute("src", item.image);
        imgCard.setAttribute("alt", item.name);
        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        let h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.textContent = item.name;
        let pDescription = document.createElement("p");
        pDescription.className = "card-text";
        pDescription.textContent = item.description;
        let pPrice = document.createElement("p");
        pPrice.className = "card-text";
        pPrice.setAttribute("id", "itemPrice");
        pPrice.textContent = "$" + item.price;
        let buttomAdd = document.createElement("a");
        buttomAdd.className = "btn btn-dark btn-item";
        buttomAdd.setAttribute("type", "button");
        buttomAdd.setAttribute("id", "button-" + category + "-" + item.name);
        buttomAdd.textContent = "Add to cart";

        buttomAdd.addEventListener("click", function () {
          count(item, quantity);
        });
        buttomAdd.addEventListener("click", function () {
          add(item);
        });

        divCard.appendChild(imgCard);

        divCardBody.appendChild(h5);
        divCardBody.appendChild(pDescription);
        divCardBody.appendChild(pPrice);
        divCardBody.appendChild(buttomAdd);

        divCard.appendChild(divCardBody);

        divProductsCards.appendChild(divCard);
      });

      tableItems.innerHTML = "";
      optionsItems.innerHTML = "";
    });
  });

  let tableHead = false;
  document.getElementById("carItems").addEventListener("click", function () {
    tableItems.innerHTML = "";
    optionsItems.innerHTML = "";
    while (divProductsCards.lastElementChild) {
      divProductsCards.removeChild(divProductsCards.lastElementChild);
    }

    let title = document.getElementById("titleCategory");
    title.textContent = "Order detail";

    let table = document.createElement("table");
    table.className = "table table-striped";

    if (tableHead == false) {
      let tHead = document.createElement("thead");
      let trHead = document.createElement("tr");
      let nameColumns = [
        "Item",
        "Qty.",
        "Description",
        "Unit Price",
        "Amount",
        "Modify",
      ];

      for (let i = 0; i < nameColumns.length; i++) {
        let trHd = document.createElement("th");
        trHd.textContent = nameColumns[i];
        trHd.setAttribute("scope", "col");
        trHead.appendChild(trHd);
      }

      tHead.appendChild(trHead);
      table.appendChild(tHead);
      tableHead = true;
    }

    let tBody = document.createElement("tbody");
    let spanTotal;
    let index = 1;
    let total = 0;

    quantity.forEach((element) => {
      let tr = document.createElement("tr");
      let thIndex = document.createElement("th");
      thIndex.setAttribute("scope", "col");
      thIndex.textContent = index;
      let tdQty = document.createElement("td");
      tdQty.textContent = element.quantity;
      let tdDescription = document.createElement("td");
      tdDescription.textContent = element.food;
      let tdUnitPrice = document.createElement("td");
      tdUnitPrice.textContent = element.unitPrice;
      let tdAmount = document.createElement("td");
      tdAmount.textContent = element.amount;
      let tdButtons = document.createElement("td");

      let buttomAdd = document.createElement("a");
      buttomAdd.className = "btn btn-dark btn-row";
      buttomAdd.textContent = "+";

      buttomAdd.addEventListener("click", function () {
        tdQty.textContent = ++element.quantity;
        tdAmount.textContent = element.quantity * element.unitPrice;
        element.amount = element.quantity * element.unitPrice;
        spanTotal.textContent = "Total $" + recalTotalA(quantity);
      });

      let buttomLess = document.createElement("a");
      buttomLess.className = "btn btn-dark btn-row";
      buttomLess.textContent = "-";

      buttomLess.addEventListener("click", function () {
        tdQty.textContent = --element.quantity;
        if (tdQty.textContent !== 0) {
          tdAmount.textContent = element.quantity * element.unitPrice;
          element.amount = element.quantity * element.unitPrice;
          spanTotal.textContent = "Total $" + recalTotalD(quantity);
        }
        if (tdQty.textContent === "0") {
          tr.innerHTML = "";
          descount();
        }
      });

      tr.appendChild(thIndex);
      tr.appendChild(tdQty);
      tr.appendChild(tdDescription);
      tr.appendChild(tdUnitPrice);
      tr.appendChild(tdAmount);

      tdButtons.appendChild(buttomAdd);
      tdButtons.appendChild(buttomLess);

      tr.appendChild(tdButtons);
      tBody.appendChild(tr);
      total += element.amount;
      index++;
    });

    let divRow = document.createElement("div");
    divRow.className = "row";
    let divSpan = document.createElement("div");
    divSpan.className = "col";
    spanTotal = document.createElement("span");
    spanTotal.textContent = "Total: $" + total;
    spanTotal.setAttribute("id", "spanTotalItems");
    divSpan.appendChild(spanTotal);
    let divButtoms = document.createElement("div");
    divButtoms.className = "col d-flex justify-content-end";
    divButtoms.setAttribute("id", "divButtoms");
    let buttomCancel = document.createElement("button");
    buttomCancel.className = "btn btn-danger btn-order";
    buttomCancel.textContent = "Cancel";
    buttomCancel.setAttribute("data-target", "#cancelModal");
    buttomCancel.setAttribute("data-toggle", "modal");
    let buttomConfirm = document.createElement("a");
    buttomConfirm.className = "btn btn-light btn-order";
    buttomConfirm.textContent = "Confirm order";

    buttomConfirm.addEventListener("click", function () {
      let i = 1;
      let order = [];
      quantity.forEach((element) => {
        let objectOrder = {};
        objectOrder["item"] = i;
        objectOrder["quantity"] = element.quantity;
        objectOrder["description"] = element.food;
        objectOrder["unitPrice"] = element.unitPrice;
        order.push(objectOrder);
      });
      console.log(order);
    });

    divButtoms.appendChild(buttomCancel);
    divButtoms.appendChild(buttomConfirm);

    divRow.appendChild(divSpan);
    divRow.appendChild(divButtoms);

    table.appendChild(tBody);
    tableItems.appendChild(table);
    optionsItems.appendChild(divRow);

    document.getElementById("buttonYes").addEventListener("click", function () {
      tableItems.innerHTML = "";
      optionsItems.innerHTML = "";
      quantity = [];
      tableHead = false;
      clearCar();
    });
  });
}
