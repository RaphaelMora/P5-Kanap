fetch("http://localhost:3000/api/products") 
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  
  .then(function allArticle(article) {
    article.forEach(products => {

      const items = document.getElementById("items")
      const anchor = document.createElement("a")
      anchor.setAttribute('href', "./product.html?id=" + products._id)
      items.appendChild(anchor)

      const article = document.createElement("article")
      anchor.appendChild(article)

      const img = document.createElement("img")
      img.src = products.imageUrl
      img.alt = products.altTxt
      article.appendChild(img)

      const h3 = document.createElement("h3")
      h3.classList.add("productName")
      h3.innerText = products.name
      article.appendChild(h3)

      const p = document.createElement("p")
      p.classList.add("productDescription")
      p.innerText = products.description
      article.appendChild(p)
    })
}
  ) 

    .catch(function (err) {
        // Une erreur est survenue
    })

