// récupération du panier du localstorage
let cart = jsonCart();
function jsonCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

//create while with all data from lS
for (let product of cart) {
    let dataCart =
    {
        id: product.id,
        color: product.color,
        quantity: product.quantity,
        price: product.price
    }

    fetch('http://localhost:3000/api/products/' + dataCart.id)
        .then((response) => response.json())
        .then((product) => showProducts(product))

    function showProducts(product) {

        let section = document.getElementById('cart__items');

        let article = document.createElement('article');
        article.className = 'cart__item';
        article.dataset.id = product.id;
        article.dataset.color = product.color;
        section.appendChild(article);

        let imgDiv = document.createElement('div');
        imgDiv.className = 'cart__item__img';
        article.appendChild(imgDiv);

        let img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        imgDiv.appendChild(img);

        let contentDiv = document.createElement('div');
        contentDiv.className = 'cart__item__content';
        article.appendChild(contentDiv);

        let descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'cart__item__content__description';
        contentDiv.appendChild(descriptionDiv);

        let h2 = document.createElement('h2');
        h2.innerText = product.name;
        descriptionDiv.appendChild(h2);

        let pColor = document.createElement('p');
        pColor.innerText = dataCart.color;
        descriptionDiv.appendChild(pColor);

        let pPrice = document.createElement('p');
        pPrice.innerText = product.price + '€';
        descriptionDiv.appendChild(pPrice);

        let settingsDiv = document.createElement('div');
        settingsDiv.className = 'cart__item__content__settings';
        contentDiv.appendChild(settingsDiv);

        let quantityDiv = document.createElement('div');
        quantityDiv.className = 'cart__item__content__settings__quantity';
        settingsDiv.appendChild(quantityDiv);

        let deleteDiv = document.createElement("div")
        deleteDiv.classList.add("cart__item__content__settings__delete")
        settingsDiv.appendChild(deleteDiv)

        let pDelete = document.createElement("p")
        pDelete.classList = 'deleteItem'
        pDelete.textContent = "Supprimer"
        deleteDiv.appendChild(pDelete)

        let pQuantity = document.createElement('p');
        pQuantity.value = dataCart.quantity;
        pQuantity.innerText = 'Qté : '
        quantityDiv.appendChild(pQuantity);

        let input = document.createElement('input');
        input.className = 'itemQuantity';
        input.type = "number";
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.value = dataCart.quantity;
        quantityDiv.appendChild(input);

        let totalQuantity = document.querySelector("#totalQuantity")
        let totalQ = cart.reduce((totalQ, product) => totalQ + product.quantity, 0)
        totalQuantity.textContent = totalQ

        let totalPrice = document.querySelector("#totalPrice")
        cart.forEach((cart) => {
            let totalP = cart.price * totalQ
            totalPrice.textContent = totalP
        })

        input.addEventListener("change", (a) => {
            a.preventDefault();
            let modifyId = dataCart.id;
            let modifycolor = dataCart.color;
            let modifyProduct = cart.find((p) => p.id == modifyId) && cart.find((p) => p.color == modifycolor);
            if (modifyProduct) {
                modifyProduct.quantite = input.value;
                localStorage.setItem("cart", JSON.stringify(modifyProduct));

            } else {
                cart.push(productChange);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            redirect();
        }
        )

        pDelete.addEventListener("click", (b) => {
            b.preventDefault();
            let deleteId = dataCart.id;
            let deletecolor = dataCart.color;
            let deleteItem = cart.filter(p => p.id != deleteId || p.color != deletecolor);
            b.target.closest('.cart__item').remove();
            localStorage.setItem("cart", JSON.stringify(deleteItem));
            redirect();
        }
        )

        function redirect() {
            window.location.href = "cart.html"
        }
    }
}
////Form
document.querySelector("#order").addEventListener("submit", function (e){
    e.preventDefault();

    let firstName = document.getElementById('firstName');
    let regexName = new RegExp('^[a-zA-Z\-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]{2,50}$', 'g');
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if (regexName.test(firstName.value) === false) {
        firstNameErrorMsg.innerHTML = "Prénom invalide"
    }

    let lastName = document.getElementById('lastName');
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if (regexName.test(lastName.value) === false) {
        lastNameErrorMsg.innerHTML = "Nom invalide"
    }

    let regexAdress = new RegExp('^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛäëïöüÿÄËÏÖÜŸçÇæœ,-\s{0,45}]+$', 'g');
    let address = document.getElementById('address');
    let addressErrorMsg = document.getElementById('addressErrorMsg');
    if (regexAdress.test(address.value) === false) {
        addressErrorMsg.innerHTML = "Adresse invalide"
    }

    let regexCity = new RegExp('^[a-zA-Z-àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛäëïöüÿÄËÏÖÜŸçÇæœ\s]+$', 'g')
    let city = document.getElementById('city');
    let cityErrorMsg = document.getElementById('cityErrorMsg');
    if (regexCity.test(city.value) === false) {
        cityErrorMsg.innerHTML = "Adresse invalide"
    }

    let regexMail = new RegExp('^[\w.-\S]+[@][\w\d\S]+[.][\w\d\S]{2,8}$', 'g')
    let email = document.getElementById('email');
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    if (regexMail.test(email.value) === false) {
        emailErrorMsg.innerHTML = "Adresse invalide"
    }
});

const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
};

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        "Content-type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(contact)
})
    .then((response) => response.json())
    .then((ok) => redirect(ok))
