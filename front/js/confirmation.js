
    let cart = localStorage.getItem("cart");
    let contact = localStorage.getItem("contact");



    fetch('http://localhost:3000/api/cart/')
        .then((response) => response.json())