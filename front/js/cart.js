// retrieve the content of the localStorage
let cart = jsonCart();
function jsonCart() {
  let cart = localStorage.getItem("cart");
  if (cart === null || cart.length === 0) {
    alert("Votre panier est vide");
    window.location.href = "index.html";
    return [];
  } else {
    return JSON.parse(cart);
  }
}
//Object that contains all the information for each product
for (let product of cart) {
  let dataCart = {
    id: product.id,
    color: product.color,
    quantity: product.quantity,
  };

  //Displaying the contents of the Local Storage
  fetch("http://localhost:3000/api/products/" + dataCart.id)
    .then((response) => response.json())
    .then((product) => showProducts(product));

  function showProducts(product) {
    let section = document.getElementById("cart__items");

    let article = document.createElement("article");
    article.className = "cart__item";
    article.dataset.id = product.id;
    article.dataset.color = product.color;
    section.appendChild(article);

    let imgDiv = document.createElement("div");
    imgDiv.className = "cart__item__img";
    article.appendChild(imgDiv);

    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    imgDiv.appendChild(img);

    let contentDiv = document.createElement("div");
    contentDiv.className = "cart__item__content";
    article.appendChild(contentDiv);

    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "cart__item__content__description";
    contentDiv.appendChild(descriptionDiv);

    let h2 = document.createElement("h2");
    h2.innerText = product.name;
    descriptionDiv.appendChild(h2);

    let pColor = document.createElement("p");
    pColor.innerText = dataCart.color;
    descriptionDiv.appendChild(pColor);

    let pPrice = document.createElement("p");
    pPrice.innerText = product.price + "€";
    descriptionDiv.appendChild(pPrice);

    let settingsDiv = document.createElement("div");
    settingsDiv.className = "cart__item__content__settings";
    contentDiv.appendChild(settingsDiv);

    let quantityDiv = document.createElement("div");
    quantityDiv.className = "cart__item__content__settings__quantity";
    settingsDiv.appendChild(quantityDiv);

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("cart__item__content__settings__delete");
    settingsDiv.appendChild(deleteDiv);

    let pDelete = document.createElement("p");
    pDelete.classList = "deleteItem";
    pDelete.textContent = "Supprimer";
    deleteDiv.appendChild(pDelete);

    let pQuantity = document.createElement("p");
    pQuantity.value = dataCart.quantity;
    pQuantity.innerText = "Qté : ";
    quantityDiv.appendChild(pQuantity);

    let input = document.createElement("input");
    input.className = "itemQuantity";
    input.type = "number";
    input.name = "itemQuantity";
    input.min = 1;
    input.max = 100;
    input.value = dataCart.quantity;
    TotalQuantityCart();
    TotalPriceCart();
    quantityDiv.appendChild(input);

    //Update quantity
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < itemQuantity.length; i++) {
      itemQuantity[i].addEventListener("click", () => {
        let modifyQuantity = parseInt(itemQuantity[i].value);
        cart[i].quantity = modifyQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        TotalQuantityCart();
        TotalPriceCart();
        alert("quantité modifiée");
      });
    }

    //Product deletion
    pDelete.addEventListener("click", (a) => {
      a.preventDefault();
      let deleteId = dataCart.id;
      let deletecolor = dataCart.color;
      let deleteItem = cart.filter(
        (p) => p.id != deleteId || p.color != deletecolor
      );
      a.target.closest(".cart__item").remove();
      localStorage.setItem("cart", JSON.stringify(deleteItem));
      window.location.reload(false);
    });

    //Display the total number of products in the cart
    function TotalQuantityCart() {
      let totalQuantity = document.querySelector("#totalQuantity");
      let quantityPanier = 0;
      for (let i = 0; i < cart.length; i++) {
        quantityPanier += cart[i].quantity;
      }
      totalQuantity.textContent = quantityPanier;
    }
    //Display of total prices
    function TotalPriceCart() {
      let totalPrice = document.querySelector("#totalPrice");
      let totalP = 0;
      cart.forEach((cart) => {
        totalP += product.price * cart.quantity;
      });
      totalPrice.textContent = totalP;
    }
  }
}

//Form and Regex
document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();

  let nameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  let firstName = document.getElementById("firstName");
  if (firstName.value == "" || nameRegex.test(firstName.value) == false) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Merci de renseigner votre prénom";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "";
  }

  let lastName = document.getElementById("lastName");
  if (lastName.value == "" || nameRegex.test(lastName.value) == false) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Merci de renseigner votre nom";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").textContent = "";
  }
  let addressRegex =
    /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛäëïöüÿÄËÏÖÜŸçÇæœ,-\s{0,45}]+$/;
  let address = document.getElementById("address");
  if (address.value == "" || addressRegex.test(address.value) == false) {
    document.getElementById("addressErrorMsg").textContent =
      "Merci de renseigner votre adresse";
    return false;
  } else {
    document.getElementById("addressErrorMsg").textContent = "";
  }
  let cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  let city = document.getElementById("city");
  if (city.value == "" || cityRegex.test(city.value) == false) {
    document.getElementById("cityErrorMsg").textContent =
      "Merci de renseigner votre ville";
    return false;
  } else {
    document.getElementById("cityErrorMsg").textContent = "";
  }

  let emailRegex = /[\w.-\S]+[@][\w\d\S]+[.][\w\d\S]{2,8}$/;
  let email = document.getElementById("email");
  if (email.value == "" || emailRegex.test(email.value) == false) {
    document.getElementById("emailErrorMsg").textContent =
      "Merci de renseigner votre adresse email";
    return false;
  } else {
    document.getElementById("emailErrorMsg").textContent = "";
  }

  let products = [];
  cart.forEach((element) => {
    products.push(element.id);
  });

  //Contact object gathering all the information of the form
  let contactInformations = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    productId: products,
  };

  //Post method for sending the form
  let cartConfirmation = {
    method: "POST",
    headers: {
      Accept: "application/json;charset=utf-8",
    },
    body: JSON.stringify(contactInformations),
  };

  fetch("http://localhost:3000/api/products/order", cartConfirmation)
    .then((result) => result.json())
    .then(() => {
      localStorage.setItem("orderId", products);
      location.href = `./confirmation.html?orderId=${products}`;
    });
});
