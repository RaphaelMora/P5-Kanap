let url = new URL(window.location.href);
let search_params = url.searchParams;
let urlId = url.searchParams.get('id');

fetch(`http://localhost:3000/api/products/${urlId}`) //Redirect to API with product ID
    .then((response) => response.json())
    .then((responseOk) => allInformationsProduct(responseOk))

function allInformationsProduct(product) {

    const { imageUrl, altTxt, name, price } = product

    // if url is not null 
    function urlId() {
        if (urlId != null) {
            let imgUrl
            let altText
            let h1Name
            let spanPrice
        }
    }

    // img product
    let imgDiv = document.querySelector(".item__img");
    let img = document.createElement("img")
    img.src = product.imageUrl;
    imgUrl = imageUrl
    img.alt = product.altTxt;
    altText = altTxt
    imgDiv.appendChild(img)


    // title product
    let h1 = document.getElementById('title');
    h1.textContent = product.name;
    h1Name = name


    // price product
    let span = document.getElementById('price');
    span.textContent = product.price;
    spanPrice = price


    // description product
    let p = document.getElementById('description');
    p.textContent = product.description;


    // color 
    let select = document.getElementById('colors');
    for (let colors of product.colors) {
        select.innerHTML += `<option value="${colors}">${colors}</option>`;
        product.color = select.innerHTML;
    }

    // initialisation of click button
    let button = document.querySelector("#addToCart")
    button.addEventListener("click", Click)

}

//save data from page to localStorage
function infoBasket (color, quantity){
    let data = {
        id: urlId,
        imageUrl: imgUrl,
        altTxt: altText,
        name: h1Name,
        color: color,
        quantity: quantity,
        price: spanPrice + '€'
    }

// if you don't select color or quantity option
    if (color, quantity == null, color === "", quantity == 0) {
        alert("Merci de selectionner une couleur ou une quantité")
        return true
    }
    localStorage.setItem(urlId, JSON.stringify(data))
}
// settings of click button
function Click() {
    let color = document.querySelector("#colors").value
    let quantity = document.querySelector("#quantity").value

    infoBasket (color, quantity)
    redirect()
}

// once basket ok redirect to cart.html
function redirect() {
    window.location.href = "cart.html"
}