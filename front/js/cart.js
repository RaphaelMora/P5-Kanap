

//data from localstorage
function dataSavedFromLocalStorage(product) {

  const section = document.querySelector("#cart__items")
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = product.id
  article.dataset.color = product.color
  section.appendChild(article)


  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement("img")
  image.src = product.imageUrl
  image.alt = product.altTxt
  div.appendChild(image)


  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = product.name
  description.appendChild(h2)

  const pColor = document.createElement("p")
  pColor.textContent = product.color
  description.appendChild(pColor)

  const pPrice = document.createElement("p")
  pPrice.textContent = product.price + " €"
  description.appendChild(pPrice)


  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const pQuantity = document.createElement("p")
  pQuantity.textContent = "Qté : "
  quantity.appendChild(pQuantity)

  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = product.quantity
}


