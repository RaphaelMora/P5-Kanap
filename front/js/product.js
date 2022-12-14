//Retrieve the selected product id from the current product page
let params = new URL(window.location.href);
let urlId = params.searchParams.get("id");

function jsonCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  }
  return JSON.parse(cart);
}

fetch(`http://localhost:3000/api/products/${urlId}`)
  .then((res) => res.json())
  .then((products) => allInformationsProduct(products));
//Selection and creation of DOM elements and display of elements in the DOM of the product page
function allInformationsProduct(products) {
  // image product
  let imgDiv = document.querySelector(".item__img");
  let img = document.createElement("img");
  img.src = products.imageUrl;
  img.alt = products.altTxt;
  imgDiv.appendChild(img);

  // title product
  let h1 = document.getElementById("title");
  h1.textContent = products.name;

  // price product
  let span = document.getElementById("price");
  span.textContent = products.price;

  // description product
  let p = document.getElementById("description");
  p.textContent = products.description;

  // color
  let select = document.getElementById("colors");
  for (let colors of products.colors) {
    select.innerHTML += `<option value="${colors}">${colors}</option>`;
    products.color = select.innerHTML;
  }

  //button to add in basket
  document
    .querySelector("#addToCart")
    .addEventListener("click", function clickToAdd() {
      let color = document.getElementById("colors").value;
      let quantity = document.getElementById("quantity").value;
      let cart = jsonCart();
      let dataProduct = {
        id: urlId,
        color: color,
        quantity: parseInt(quantity),
      };
      //Condition, color selection or quantity required
      if (color === "" || quantity <= 0 || quantity >= 100) {
        alert(
          "Veuillez choisir une couleur ou une quantité comprise entre 1 et 100"
        );
        return;
      } else {
        //Condition, if u product has the same ID then we add it to the existing one
        if (cart) {
          let index = cart.findIndex(
            (newItemsameIdtem) =>
              newItemsameIdtem.id === dataProduct.id &&
              newItemsameIdtem.color === dataProduct.color
          );
          if (index === -1) {
            cart.push(dataProduct);
          } else {
            cart[index].quantity += dataProduct.quantity;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          cart.push(dataProduct);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        //redirect to the basket page
        redirect();
      }
    });
}

function redirect() {
  window.location.href = "cart.html";
}
