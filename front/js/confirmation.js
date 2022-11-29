let showId = localStorage.getItem("orderId");

let orderId = document.getElementById("orderId");
orderId.innerText = showId;

alert("Merci pour votre commande");
localStorage.clear();
